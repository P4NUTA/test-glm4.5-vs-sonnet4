from __future__ import annotations

from typing import List, Literal, Optional, Dict, Any
from pydantic import BaseModel, Field


BudgetLevel = Literal["economy", "standard", "comfort"]
MobilityPref = Literal["strict", "normal"]
Lang = Literal["ru", "en"]


class PlanRequest(BaseModel):
    days: int = Field(..., ge=1, le=3)
    budget_level: BudgetLevel
    mobility: MobilityPref = "strict"
    lang: Lang = "ru"
    seed: Optional[int] = None


class Place(BaseModel):
    id: str
    name_ru: str
    name_en: str
    city_ru: str
    city_en: str
    lat: float
    lon: float
    categories: List[str]
    indoor: bool
    stairs_level: int  # 0=low,1=moderate,2=high
    avg_visit_minutes: int
    cost_rub: int
    notes_ru: Optional[str] = None
    notes_en: Optional[str] = None


class TravelItem(BaseModel):
    kind: Literal["travel"] = "travel"
    label_ru: str
    label_en: str
    minutes: int
    distance_km: float


class VisitItem(BaseModel):
    kind: Literal["visit"] = "visit"
    place_id: str
    name_ru: str
    name_en: str
    city_ru: str
    city_en: str
    minutes: int
    cost_rub: int
    indoor: bool
    stairs_level: int


class LunchItem(BaseModel):
    kind: Literal["lunch"] = "lunch"
    label_ru: str
    label_en: str
    minutes: int
    cost_rub: int


ItineraryItem = TravelItem | VisitItem | LunchItem


class DayBudget(BaseModel):
    attractions_rub: int
    meals_rub: int
    transport_rub: int
    total_rub: int


class RainyAlternative(BaseModel):
    place_id: str
    name_ru: str
    name_en: str
    city_ru: str
    city_en: str
    indoor: bool
    cost_rub: int


class DayPlan(BaseModel):
    day: int
    base_city_ru: str
    base_city_en: str
    items: List[ItineraryItem]
    rainy_alternatives: List[RainyAlternative]
    day_budget: DayBudget
    total_travel_minutes: int


class ItineraryResponse(BaseModel):
    ok: bool = True
    lang: Lang
    seed: int
    currency: str = "RUB"
    start_city_ru: str = "Санкт-Петербург"
    start_city_en: str = "Saint Petersburg"
    days: List[DayPlan]
    total_budget_rub: int
    message: Optional[str] = None


class ErrorResponse(BaseModel):
    ok: bool = False
    error: str
    details: Optional[Dict[str, Any]] = None
