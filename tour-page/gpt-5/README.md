# Tour Planner 55+ for Leningrad Oblast

Local-first itinerary planner that generates 1–3 day trips optimized for comfort of travelers aged 55+: fewer transfers, low stairs, budget estimates, travel time, and rainy-day alternatives. Default UI language is Russian with a simple switch to English. No external APIs.

## Features
- 1–3 day itineraries with minimal transfers (clustered by city)
- Prioritizes low stairs accessibility for 55+
- Budget estimate per day (attractions, meals, transport)
- Travel time estimates (haversine at road speed heuristics)
- Rainy-day alternatives (indoor options per day)
- Deterministic results with explicit seed
- Graceful error handling with helpful messages (RU/EN)
- Single container running FastAPI and serving static UI
- Docker healthchecks and docker-compose setup

## Quickstart

Prerequisites: Docker and Docker Compose.

```bash
# Build and run
docker compose up --build

# Open the app
# http://localhost:8080
```

The API exposes:
- `GET /healthz` — healthcheck
- `POST /api/plan` — generate itinerary

Example request:
```bash
curl -s http://localhost:8080/api/plan \
  -H 'Content-Type: application/json' \
  -d '{"days":2, "budget_level":"standard", "mobility":"strict", "lang":"ru", "seed":1234}' | jq
```

## Configuration

- `APP_DEFAULT_LANGUAGE` (default `ru`)
- `APP_SEED` (default `42`)
- `APP_PORT` (default `8000`)
- `APP_WORKERS` (default `1`)

You can set these via environment variables (see `.env.example`). No secrets are hard-coded; sensitive values should be provided via env.

## Development

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open `http://localhost:8000`.

Run the quick validation script:
```bash
python -m app --days 2 --budget standard --mobility strict --lang ru --seed 123
```

## Project Structure

```
app/
  main.py           # FastAPI app + static
  config.py         # Env config
  models.py         # Pydantic schemas
  planner.py        # Itinerary algorithm
  utils.py          # Haversine, time utils, i18n helpers
  data/places.json  # Local mock data (RU/EN)
  static/           # SPA (RU default, EN switch)
    index.html
    styles.css
    app.js
    favicon.svg
requirements.txt
Dockerfile
docker-compose.yml
.env.example
README.md
```

## Notes
- Images/libs kept lightweight (no heavy frontend frameworks)
- Healthchecks hit `/healthz`
- Deterministic seeds ensure reproducible plans
- Invalid inputs return structured error messages in the requested language when possible (fall back to RU)

## License
This repository intentionally omits an explicit license per task requirements.
