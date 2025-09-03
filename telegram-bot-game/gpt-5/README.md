Telegram Number Guessing Bot

Description
- A simple Telegram bot that plays a number-guessing game with each user.
- Per chat/user state: each user in each chat has their own game.
- Default range is 1–100. You can change it via `/range <min> <max>`.

Commands
- /start: Greet and start a game in the current range.
- /newgame: Start a fresh game using the current range.
- /range <min> <max>: Set a new range and start a new game.
- /help: Show gameplay and command help.

Setup
- Create a bot with @BotFather and obtain the token.
- Set an environment variable with the token:
  - macOS/Linux: `export TELEGRAM_BOT_TOKEN=123456:ABC-DEF...`
  - Windows (PowerShell): `$env:TELEGRAM_BOT_TOKEN="123456:ABC-DEF..."`

Run
- `python3 bot.py`
- The bot uses long polling; keep the process running.

Usage Notes
- Send a number to guess; the bot replies with “Higher” or “Lower”.
- After a correct guess, it shows your attempt count and suggests `/newgame` or `/range`.
- In groups, the bot responds to commands addressed to it (e.g., `/newgame@YourBot`) or bare commands if permitted by chat settings.

No External Dependencies
- Uses only Python standard library (`urllib` for Telegram API calls). No extra installs required.

Troubleshooting
- If you see: `TELEGRAM_BOT_TOKEN not set`, export the token and retry.
- Ensure your machine has outbound internet access so the bot can reach Telegram API.

