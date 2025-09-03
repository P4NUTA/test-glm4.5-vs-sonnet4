from __future__ import annotations

import math
from typing import Dict, Literal

Lang = Literal["ru", "en"]


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Great-circle distance in kilometers."""
    r = 6371.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return r * c


def minutes_from_km(distance_km: float, road_speed_kmh: float = 55.0) -> int:
    if road_speed_kmh <= 0:
        road_speed_kmh = 50.0
    minutes = (distance_km / road_speed_kmh) * 60.0
    return max(1, int(round(minutes)))


def fmt_minutes(mins: int, lang: Lang = "ru") -> str:
    if lang == "ru":
        return f"{mins} мин"
    return f"{mins} min"


def translate(msg_key: str, lang: Lang = "ru") -> str:
    t: Dict[str, Dict[str, str]] = {
        "error_invalid_days": {
            "ru": "Параметр days должен быть 1, 2 или 3.",
            "en": "Parameter days must be 1, 2, or 3.",
        },
        "error_invalid_budget": {
            "ru": "Параметр budget_level должен быть economy, standard или comfort.",
            "en": "Parameter budget_level must be economy, standard, or comfort.",
        },
        "error_invalid_mobility": {
            "ru": "Параметр mobility должен быть strict или normal.",
            "en": "Parameter mobility must be strict or normal.",
        },
        "error_invalid_lang": {
            "ru": "Параметр lang должен быть ru или en.",
            "en": "Parameter lang must be ru or en.",
        },
        "error_general": {
            "ru": "Произошла ошибка при генерации маршрута.",
            "en": "An error occurred while generating the itinerary.",
        },
        "lunch": {"ru": "Обед (кафе)", "en": "Lunch (cafe)"},
        "travel": {"ru": "Переезд", "en": "Transfer"},
    }
    bucket = t.get(msg_key, {})
    return bucket.get(lang, bucket.get("ru", msg_key))


def clamp(v: int, lo: int, hi: int) -> int:
    return max(lo, min(hi, v))
