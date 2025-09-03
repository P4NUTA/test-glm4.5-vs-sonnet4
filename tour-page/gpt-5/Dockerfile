FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_HOME=/app \
    APP_PORT=8000 \
    APP_WORKERS=1 \
    APP_DEFAULT_LANGUAGE=ru \
    APP_SEED=42

WORKDIR ${APP_HOME}

# Install runtime deps (curl for healthcheck), then cleanup.
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -u 10001 appuser

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

USER appuser

EXPOSE ${APP_PORT}

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -fsS http://127.0.0.1:${APP_PORT}/healthz || exit 1

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${APP_PORT} --workers ${APP_WORKERS}"]
