#!/usr/bin/env python3
import json
import os
import random
import signal
import sys
import time
import urllib.parse
import urllib.request
import urllib.error
from dataclasses import dataclass
from typing import Dict, Optional, Tuple


TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
API_BASE = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}" if TELEGRAM_TOKEN else None

DEFAULT_MIN = 1
DEFAULT_MAX = 100


@dataclass
class GameState:
    min_val: int
    max_val: int
    target: int
    attempts: int
    active: bool = True


# State is kept in-memory, keyed by chat_id then user_id
states: Dict[int, Dict[int, GameState]] = {}


def debug_log(*args):
    # Simple stdout logger; can be replaced with logging module if desired
    print("[bot]", *args, flush=True)


def tg_request(method: str, params: Optional[dict] = None, http_method: str = "GET") -> dict:
    if not API_BASE:
        raise RuntimeError(
            "TELEGRAM_BOT_TOKEN env var not set. Set it and run again."
        )

    url = f"{API_BASE}/{method}"
    data = None
    headers = {"Content-Type": "application/json"}

    if http_method == "GET" and params:
        url += "?" + urllib.parse.urlencode(params)
    elif http_method == "POST":
        data = json.dumps(params or {}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method=http_method)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            raw = resp.read()
            return json.loads(raw.decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")
        debug_log(f"HTTPError {e.code} on {method}: {body}")
        raise
    except Exception as e:
        debug_log(f"Request error on {method}: {e}")
        raise


def send_message(chat_id: int, text: str, reply_to_message_id: Optional[int] = None):
    params = {
        "chat_id": chat_id,
        "text": text,
        "disable_web_page_preview": True,
    }
    if reply_to_message_id:
        params["reply_to_message_id"] = reply_to_message_id
        params["allow_sending_without_reply"] = True
    return tg_request("sendMessage", params, http_method="POST")


def get_updates(offset: Optional[int] = None, timeout: int = 30) -> list:
    params = {"timeout": timeout}
    if offset is not None:
        params["offset"] = offset
    res = tg_request("getUpdates", params, http_method="GET")
    if not res.get("ok"):
        raise RuntimeError(f"getUpdates not ok: {res}")
    return res.get("result", [])


def get_me_username() -> Optional[str]:
    try:
        res = tg_request("getMe")
        if res.get("ok"):
            return res["result"].get("username")
    except Exception:
        pass
    return None


def new_game(min_val: int = DEFAULT_MIN, max_val: int = DEFAULT_MAX) -> GameState:
    if min_val >= max_val:
        raise ValueError("min_val must be < max_val")
    target = random.randint(min_val, max_val)
    return GameState(min_val=min_val, max_val=max_val, target=target, attempts=0, active=True)


def get_state(chat_id: int, user_id: int) -> GameState:
    chat_states = states.setdefault(chat_id, {})
    st = chat_states.get(user_id)
    if st is None:
        st = new_game()
        chat_states[user_id] = st
    return st


def set_state(chat_id: int, user_id: int, state: GameState):
    states.setdefault(chat_id, {})[user_id] = state


def parse_command(text: str) -> Tuple[str, str]:
    text = text.strip()
    if not text.startswith("/"):
        return "", ""
    parts = text.split(maxsplit=1)
    cmd = parts[0]
    args = parts[1] if len(parts) > 1 else ""
    # Strip @botusername if present in cmd
    if "@" in cmd:
        cmd = cmd.split("@", 1)[0]
    return cmd.lower(), args.strip()


def handle_start(chat_id: int, user_id: int, message_id: Optional[int]):
    st = get_state(chat_id, user_id)
    st.active = True
    st.attempts = 0
    st.target = random.randint(st.min_val, st.max_val)
    set_state(chat_id, user_id, st)
    send_message(
        chat_id,
        (
            "Welcome to Number Guess!\n"
            f"I picked a number between {st.min_val} and {st.max_val}.\n"
            "Send me your guess as a number.\n\n"
            "Commands:\n"
            "/newgame — start a fresh game\n"
            "/range <min> <max> — set range and restart\n"
            "/help — show help"
        ),
    )


def handle_help(chat_id: int, user_id: int, message_id: Optional[int]):
    st = get_state(chat_id, user_id)
    send_message(
        chat_id,
        (
            "How to play:\n"
            f"I'm thinking of a number between {st.min_val} and {st.max_val}.\n"
            "Send a number; I'll reply 'higher' or 'lower' until you guess it.\n\n"
            "Commands:\n"
            "/start — greeting and start a game\n"
            "/newgame — start a fresh game\n"
            "/range <min> <max> — set range and restart\n"
            "/help — show this help"
        ),
        reply_to_message_id=message_id,
    )


def handle_newgame(chat_id: int, user_id: int, message_id: Optional[int]):
    st = get_state(chat_id, user_id)
    st.attempts = 0
    st.active = True
    st.target = random.randint(st.min_val, st.max_val)
    set_state(chat_id, user_id, st)
    send_message(
        chat_id,
        f"New game started! Range: {st.min_val}–{st.max_val}. Send your first guess.",
    )


def handle_range(chat_id: int, user_id: int, args: str, message_id: Optional[int]):
    parts = args.split()
    if len(parts) != 2:
        send_message(
            chat_id,
            "Usage: /range <min> <max>\nExample: /range 1 1000",
            reply_to_message_id=message_id,
        )
        return
    try:
        min_val = int(parts[0])
        max_val = int(parts[1])
    except ValueError:
        send_message(
            chat_id,
            "Please provide two integers. Example: /range 1 1000",
            reply_to_message_id=message_id,
        )
        return
    if min_val >= max_val:
        send_message(
            chat_id,
            "Range must have min < max. Example: /range 1 1000",
            reply_to_message_id=message_id,
        )
        return

    st = get_state(chat_id, user_id)
    st.min_val = min_val
    st.max_val = max_val
    st.attempts = 0
    st.active = True
    st.target = random.randint(st.min_val, st.max_val)
    set_state(chat_id, user_id, st)
    send_message(chat_id, f"Range set to {min_val}–{max_val}. New game started! Guess the number.")


def handle_guess(chat_id: int, user_id: int, text: str, message_id: Optional[int]):
    st = get_state(chat_id, user_id)

    # Strip any non-digit characters around the number (simple parse)
    try:
        guess = int(text.strip())
    except ValueError:
        send_message(
            chat_id,
            (
                "Please send a whole number.\n"
                f"Current range: {st.min_val}–{st.max_val}.\n"
                "Use /help for commands."
            ),
            reply_to_message_id=message_id,
        )
        return

    if guess < st.min_val or guess > st.max_val:
        send_message(
            chat_id,
            f"Out of range. Please guess between {st.min_val} and {st.max_val}.",
            reply_to_message_id=message_id,
        )
        return

    st.attempts += 1

    if guess < st.target:
        send_message(chat_id, "Higher ⬆️", reply_to_message_id=message_id)
    elif guess > st.target:
        send_message(chat_id, "Lower ⬇️", reply_to_message_id=message_id)
    else:
        st.active = False
        send_message(
            chat_id,
            (
                f"🎉 Correct! The number was {st.target}.\n"
                f"Attempts: {st.attempts}.\n\n"
                "Play again with /newgame or change range with /range <min> <max>."
            ),
            reply_to_message_id=message_id,
        )

    set_state(chat_id, user_id, st)


def handle_update(update: dict, bot_username: Optional[str]):
    message = update.get("message")
    if not message:
        return

    chat = message.get("chat") or {}
    from_user = message.get("from") or {}
    chat_id = chat.get("id")
    user_id = from_user.get("id")
    text = message.get("text", "")
    message_id = message.get("message_id")

    if not isinstance(chat_id, int) or not isinstance(user_id, int):
        return

    if text.startswith("/"):
        cmd, args = parse_command(text)

        # In group chats, respect @mentions if we know our username
        if "@" in text and bot_username:
            # Only handle commands addressed to us or bare commands
            first_token = text.split()[0]
            if "@" in first_token:
                at_user = first_token.split("@", 1)[1]
                if at_user.lower() != bot_username.lower():
                    return  # command for a different bot

        if cmd == "/start":
            handle_start(chat_id, user_id, message_id)
        elif cmd == "/help":
            handle_help(chat_id, user_id, message_id)
        elif cmd == "/newgame":
            handle_newgame(chat_id, user_id, message_id)
        elif cmd == "/range":
            handle_range(chat_id, user_id, args, message_id)
        else:
            send_message(chat_id, "Unknown command. Try /help.", reply_to_message_id=message_id)
        return

    # Not a command: treat as guess
    handle_guess(chat_id, user_id, text, message_id)


def run():
    if not TELEGRAM_TOKEN:
        debug_log("Error: TELEGRAM_BOT_TOKEN not set")
        print(
            "Set TELEGRAM_BOT_TOKEN env var to your bot token and run again.",
            file=sys.stderr,
        )
        sys.exit(1)

    debug_log("Starting bot…")
    bot_username = get_me_username()
    if bot_username:
        debug_log(f"Authenticated as @{bot_username}")
    else:
        debug_log("Authenticated. Could not determine username (will still work).")

    last_update_id = None
    keep_running = True

    def handle_sigterm(signum, frame):
        nonlocal keep_running
        keep_running = False
        debug_log("Shutting down…")

    signal.signal(signal.SIGINT, handle_sigterm)
    signal.signal(signal.SIGTERM, handle_sigterm)

    while keep_running:
        try:
            updates = get_updates(offset=last_update_id + 1 if last_update_id else None, timeout=30)
            for upd in updates:
                last_update_id = max(last_update_id or 0, upd.get("update_id", 0))
                handle_update(upd, bot_username)
        except urllib.error.HTTPError as e:
            # Respect rate limits or transient errors
            if e.code == 429:
                retry_after = 2
                try:
                    payload = json.loads(e.read().decode("utf-8"))
                    retry_after = payload.get("parameters", {}).get("retry_after", 2)
                except Exception:
                    pass
                time.sleep(min(int(retry_after), 10))
            else:
                time.sleep(1)
        except Exception as e:
            debug_log("Loop error:", e)
            time.sleep(1)

    debug_log("Stopped.")


if __name__ == "__main__":
    run()

