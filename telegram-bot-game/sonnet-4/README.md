# Telegram Number Guessing Game Bot

A Telegram bot that plays number-guessing games with users. The bot picks a random number in a given range and responds to each guess with 'higher' or 'lower' until the user guesses correctly.

## Features

- 🎯 Number guessing game with customizable range (default 1-100)
- 📊 Tracks attempts and shows results after winning
- 🎮 Per-user game state management
- 🛡️ Input validation and error handling
- 🔧 Easy setup and configuration

## Commands

- `/start` - Welcome message and start your first game
- `/newgame` - Start a new game with current range settings
- `/range <min> <max>` - Set custom range (e.g., `/range 1 1000`)
- `/help` - Show help message with game instructions

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a Telegram bot:**
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Use `/newbot` command and follow instructions
   - Copy the bot token

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your bot token:
   ```
   TELEGRAM_BOT_TOKEN=your_actual_bot_token_here
   ```

4. **Run the bot:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## How to Play

1. Start a conversation with your bot on Telegram
2. Send `/start` to begin your first game
3. The bot will think of a number in the default range (1-100)
4. Send number guesses, and the bot will respond with:
   - 📈 "Higher!" if your guess is too low
   - 📉 "Lower!" if your guess is too high
   - 🎉 Success message with attempt count if you guess correctly
5. After winning, use `/newgame` to play again

## Game Features

- **Custom Ranges**: Set any range from 1 to 1,000,000 using `/range <min> <max>`
- **Input Validation**: Handles invalid inputs gracefully
- **Attempt Tracking**: Shows how many guesses it took to win
- **Per-User State**: Each user has their own independent game
- **Range Persistence**: Custom ranges are remembered for new games

## Example Gameplay

```
User: /start
Bot: 🎮 Welcome to the Number Guessing Game!
     I'm thinking of a number between 1 and 100. Try to guess it!

User: 50
Bot: 📈 Higher!

User: 75
Bot: 📉 Lower!

User: 62
Bot: 🎉 Correct! You guessed it in 3 attempts!
     The number was 62. Would you like to play again? Use /newgame to start another round.
```

## Development

The bot uses:
- `node-telegram-bot-api` for Telegram integration
- In-memory game state storage (Map)
- Environment variables for configuration