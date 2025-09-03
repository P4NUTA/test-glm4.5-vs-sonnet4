from __future__ import annotations

import json
import random
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple, Iterable

from .models import (
    Place,
    BudgetLevel,
    MobilityPref,
    TravelItem,
    VisitItem,
    LunchItem,
    DayBudget,
    DayPlan,
    RainyAlternative,
    ItineraryResponse,
)
from .utils import haversine_km, minutes_from_km


DATA_PATH = Path(__file__).resolve().parent / "data" / "places.json"


SPB_COORD = (59.9391, 30.3158)  # Saint Petersburg center


@dataclass
class PlannerConfig:
    budget_level: BudgetLevel
    mobility: MobilityPref
    seed: int
    lang: str


def load_places() -> List[Place]:
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        raw = json.load(f)
    return [Place(**p) for p in raw]


def group_by_city(places: Iterable[Place]) -> Dict[str, List[Place]]:
    grouped: Dict[str, List[Place]] = {}
    for p in places:
        grouped.setdefault(p.city_ru, []).append(p)
    return grouped


def filter_accessible(places: Iterable[Place], mobility: MobilityPref) -> List[Place]:
    max_stairs = 1 if mobility == "strict" else 2
    return [p for p in places if p.stairs_level <= max_stairs]


def filter_budget(places: Iterable[Place], budget: BudgetLevel) -> List[Place]:
    # Simple thresholds per attraction cost
    if budget == "economy":
        max_cost = 600
    elif budget == "standard":
        max_cost = 1200
    else:
        max_cost = 10_000
    return [p for p in places if p.cost_rub <= max_cost]


def city_center(city_places: List[Place]) -> Tuple[float, float]:
    # Average lat/lon for city centroid
    lat = sum(p.lat for p in city_places) / len(city_places)
    lon = sum(p.lon for p in city_places) / len(city_places)
    return (lat, lon)


def sort_cities_by_accessibility(places: List[Place]) -> List[Tuple[str, int, float]]:
    # Rank cities: more accessible places first, then proximity to SPB
    grouped = group_by_city(places)
    ranking: List[Tuple[str, int, float]] = []
    for city, plist in grouped.items():
        count = len(plist)
        c_lat, c_lon = city_center(plist)
        dist = haversine_km(SPB_COORD[0], SPB_COORD[1], c_lat, c_lon)
        ranking.append((city, count, dist))
    # more places first, then closer distance
    ranking.sort(key=lambda x: (-x[1], x[2], x[0]))
    return ranking


def choose_places_in_city(plist: List[Place], r: random.Random, max_count: int = 3) -> List[Place]:
    # Prefer indoor+low stairs, then by lower cost, then by shorter visit (to fit day)
    def score(p: Place) -> Tuple[int, int, int, str]:
        return (
            0 if p.indoor else 1,
            p.stairs_level,
            p.cost_rub,
            p.name_ru,
        )

    filtered = [p for p in plist if p.avg_visit_minutes > 0 and ("note" not in p.categories)]
    sorted_places = sorted(filtered, key=score)
    return sorted_places[:max_count]


def nearest_neighbor_order(places: List[Place], start_coord: Tuple[float, float]) -> List[Place]:
    remaining = places.copy()
    ordered: List[Place] = []
    current = start_coord
    while remaining:
        nxt = min(remaining, key=lambda p: haversine_km(current[0], current[1], p.lat, p.lon))
        ordered.append(nxt)
        current = (nxt.lat, nxt.lon)
        remaining.remove(nxt)
    return ordered


def meals_cost(budget: BudgetLevel) -> int:
    return {"economy": 400, "standard": 800, "comfort": 1200}[budget]


def transport_cost_km(distance_km: float) -> int:
    # Approximate public transport cost per km (round trip handled separately)
    return int(round(distance_km * 8))


def plan_itinerary(days: int, cfg: PlannerConfig) -> ItineraryResponse:
    all_places = load_places()
    # Exclude non-visitable placeholders
    usable = [p for p in all_places if p.avg_visit_minutes > 0 and ("note" not in p.categories)]
    accessible = filter_accessible(usable, cfg.mobility)
    by_budget = filter_budget(accessible, cfg.budget_level)

    # Group and rank cities
    ranked_cities = sort_cities_by_accessibility(by_budget)
    chosen_cities = [c for c, _, _ in ranked_cities[: max(1, days)]]

    # Deterministic randomness for tie-breakers (if any)
    r = random.Random(cfg.seed)

    day_plans: List[DayPlan] = []
    total_budget = 0

    # Build day-by-day
    for d, city in enumerate(chosen_cities[:days], start=1):
        city_places = [p for p in by_budget if p.city_ru == city]
        if not city_places:
            # if somehow empty, fallback to next available city with any accessible places
            fallback_city = next((c for c, _, _ in ranked_cities if c != city), city)
            city = fallback_city
            city_places = [p for p in by_budget if p.city_ru == city]

        # Pick up to 3 places prioritizing indoor, low stairs, low cost
        picks = choose_places_in_city(city_places, r, max_count=3)

        # Order picks to minimize walking/transfer inside city
        c_lat, c_lon = city_center(city_places)
        ordered = nearest_neighbor_order(picks, (c_lat, c_lon))

        # Build items timeline: SPB -> first, then visits with transfers, lunch in the middle
        items: List = []
        # Travel SPB -> city center
        dist_to_city = haversine_km(SPB_COORD[0], SPB_COORD[1], c_lat, c_lon)
        minutes_to_city = minutes_from_km(dist_to_city)
        items.append(
            TravelItem(
                label_ru=f"Переезд из Санкт-Петербурга в {city}",
                label_en=f"Transfer from Saint Petersburg to {ordered[0].city_en if ordered else city}",
                minutes=minutes_to_city,
                distance_km=round(dist_to_city, 1),
            )
        )

        # Visits and transfers between them
        prev_lat, prev_lon = c_lat, c_lon
        visit_cost_sum = 0
        travel_minutes_inside = 0
        for idx, p in enumerate(ordered):
            # travel from prev
            dist = haversine_km(prev_lat, prev_lon, p.lat, p.lon)
            mins = minutes_from_km(dist, road_speed_kmh=30.0)  # inside city slower
            items.append(
                TravelItem(
                    label_ru=f"{p.city_ru}: переезд к {p.name_ru}",
                    label_en=f"{p.city_en}: transfer to {p.name_en}",
                    minutes=mins,
                    distance_km=round(dist, 1),
                )
            )
            travel_minutes_inside += mins
            prev_lat, prev_lon = p.lat, p.lon

            # visit
            items.append(
                VisitItem(
                    place_id=p.id,
                    name_ru=p.name_ru,
                    name_en=p.name_en,
                    city_ru=p.city_ru,
                    city_en=p.city_en,
                    minutes=p.avg_visit_minutes,
                    cost_rub=p.cost_rub,
                    indoor=p.indoor,
                    stairs_level=p.stairs_level,
                )
            )
            visit_cost_sum += p.cost_rub

            # lunch roughly after first or second visit
            if idx == 0 and len(ordered) >= 2:
                items.append(
                    LunchItem(
                        label_ru="Обед (кафе)",
                        label_en="Lunch (cafe)",
                        minutes=60,
                        cost_rub=meals_cost(cfg.budget_level),
                    )
                )

        # Return to SPB (approx from last visited location)
        last_lat, last_lon = (prev_lat, prev_lon) if ordered else (c_lat, c_lon)
        dist_back = haversine_km(last_lat, last_lon, SPB_COORD[0], SPB_COORD[1])
        mins_back = minutes_from_km(dist_back)
        items.append(
            TravelItem(
                label_ru=f"Возвращение в Санкт-Петербург",
                label_en=f"Return to Saint Petersburg",
                minutes=mins_back,
                distance_km=round(dist_back, 1),
            )
        )

        # Rainy-day alternatives: indoor places in city not chosen
        chosen_ids = {p.id for p in ordered}
        rainy_pool = [p for p in city_places if p.indoor and p.id not in chosen_ids]
        rainy_pool.sort(key=lambda p: (p.cost_rub, p.avg_visit_minutes, p.name_ru))
        rainy_alts = [
            RainyAlternative(
                place_id=p.id,
                name_ru=p.name_ru,
                name_en=p.name_en,
                city_ru=p.city_ru,
                city_en=p.city_en,
                indoor=p.indoor,
                cost_rub=p.cost_rub,
            )
            for p in rainy_pool[:3]
        ]

        # Budget breakdown
        transport_rub = transport_cost_km(dist_to_city) * 2  # round trip
        meals_rub = meals_cost(cfg.budget_level)
        day_total = visit_cost_sum + meals_rub + transport_rub
        total_budget += day_total

        # Sum total travel minutes
        total_travel_minutes = minutes_to_city + travel_minutes_inside + mins_back

        # Base city names from first picked or city pool
        base_city_ru = ordered[0].city_ru if ordered else city
        base_city_en = ordered[0].city_en if ordered else city

        day_plans.append(
            DayPlan(
                day=d,
                base_city_ru=base_city_ru,
                base_city_en=base_city_en if isinstance(base_city_en, str) else base_city_ru,
                items=items,
                rainy_alternatives=rainy_alts,
                day_budget=DayBudget(
                    attractions_rub=visit_cost_sum,
                    meals_rub=meals_rub,
                    transport_rub=transport_rub,
                    total_rub=day_total,
                ),
                total_travel_minutes=total_travel_minutes,
            )
        )

    return ItineraryResponse(
        lang=cfg.lang, seed=cfg.seed, days=day_plans, total_budget_rub=total_budget
    )
