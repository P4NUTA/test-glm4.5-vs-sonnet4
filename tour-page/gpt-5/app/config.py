import os
from typing import Literal


Lang = Literal["ru", "en"]


def get_env(name: str, default: str) -> str:
    return os.environ.get(name, default)


class Settings:
    def __init__(self) -> None:
        self.default_language: Lang = (get_env("APP_DEFAULT_LANGUAGE", "ru").lower() or "ru")  # type: ignore
        if self.default_language not in ("ru", "en"):
            self.default_language = "ru"
        self.seed: int = int(get_env("APP_SEED", "42"))
        self.port: int = int(get_env("APP_PORT", "8000"))
        self.workers: int = int(get_env("APP_WORKERS", "1"))


settings = Settings()
