from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import ValidationError

from .config import settings
from .models import PlanRequest, ErrorResponse
from .planner import PlannerConfig, plan_itinerary
from .utils import translate


app = FastAPI(title="Tour Planner 55+ for Leningrad Oblast", docs_url=None, redoc_url=None)

static_dir = Path(__file__).resolve().parent / "static"
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")


@app.get("/", response_class=HTMLResponse)
def index() -> Any:
    index_path = static_dir / "index.html"
    return FileResponse(str(index_path))


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "ok"}


@app.post("/api/plan")
async def api_plan(req: Request) -> Any:
    lang = settings.default_language
    try:
        payload = await req.json()
    except Exception:
        # Fallback to default language
        msg = translate("error_general", lang)
        return JSONResponse(status_code=400, content=ErrorResponse(ok=False, error=msg).model_dump())

    # validate language early for error translations
    body_lang = str(payload.get("lang", settings.default_language)).lower()
    if body_lang in ("ru", "en"):
        lang = body_lang

    try:
        data = PlanRequest(**payload)
    except ValidationError as e:
        # Map pydantic field errors to friendly messages
        # Identify which field failed for helpful RU/EN message
        field_errors = {err["loc"][0]: err["msg"] for err in e.errors() if err.get("loc")}
        if "days" in field_errors:
            msg = translate("error_invalid_days", lang)
        elif "budget_level" in field_errors:
            msg = translate("error_invalid_budget", lang)
        elif "mobility" in field_errors:
            msg = translate("error_invalid_mobility", lang)
        elif "lang" in field_errors:
            msg = translate("error_invalid_lang", lang)
        else:
            msg = translate("error_general", lang)
        return JSONResponse(
            status_code=400, content=ErrorResponse(ok=False, error=msg, details=field_errors).model_dump()
        )

    try:
        cfg = PlannerConfig(
            budget_level=data.budget_level, mobility=data.mobility, seed=data.seed or settings.seed, lang=data.lang
        )
        itinerary = plan_itinerary(days=data.days, cfg=cfg)
        return JSONResponse(content=itinerary.model_dump())
    except Exception:
        msg = translate("error_general", lang)
        return JSONResponse(status_code=500, content=ErrorResponse(ok=False, error=msg).model_dump())


# Simple CLI: python -m app --days 2 --budget standard --mobility strict --lang ru --seed 123
def _cli() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Generate sample itinerary")
    parser.add_argument("--days", type=int, default=2)
    parser.add_argument("--budget", choices=["economy", "standard", "comfort"], default="standard")
    parser.add_argument("--mobility", choices=["strict", "normal"], default="strict")
    parser.add_argument("--lang", choices=["ru", "en"], default=settings.default_language)
    parser.add_argument("--seed", type=int, default=settings.seed)
    args = parser.parse_args()

    cfg = PlannerConfig(budget_level=args.budget, mobility=args.mobility, seed=args.seed, lang=args.lang)
    res = plan_itinerary(days=args.days, cfg=cfg)
    print(json.dumps(res.model_dump(), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    _cli()
