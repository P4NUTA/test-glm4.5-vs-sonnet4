# Number Guessing Game Bot

A Telegram bot that plays a number-guessing game with users.

## Features

- 🎯 Random number generation within customizable range (default 1-100)
- 🎮 Per-user game state management
- 📊 Attempt counting and statistics
- 🎉 Win detection and celebration
- 🔄 Game restart functionality
- 📈 "Higher/Lower" hints
- ❌ Graceful invalid input handling

## Commands

- `/start` - Start a new game (1-100)
- `/newgame` - Start a fresh game
- `/range` - Show current range
- `/range min max` - Set custom range (e.g., `/range 1 1000`)
- `/help` - Show help message

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variable:
   ```bash
   export TELEGRAM_BOT_TOKEN="your_bot_token_here"
   ```

3. Run the bot:
   ```bash
   npm start
   ```

## How to Play

1. Use `/start` to begin a game
2. The bot picks a random number in the current range
3. Send numbers as guesses
4. Bot responds with "higher" or "lower"
5. Keep guessing until you find the number
6. After winning, see your attempts and start a new game

## Requirements

- Node.js 16.0.0 or higher
- Telegram Bot Token from @BotFather