const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('TELEGRAM_BOT_TOKEN environment variable is required');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const gameStates = new Map();

function startNewGame(chatId, min = 1, max = 100) {
  const targetNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  gameStates.set(chatId, {
    targetNumber,
    min,
    max,
    attempts: 0,
    active: true
  });
  return targetNumber;
}

function getGameState(chatId) {
  return gameStates.get(chatId);
}

function endGame(chatId) {
  gameStates.delete(chatId);
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const targetNumber = startNewGame(chatId);
  
  bot.sendMessage(chatId, 
    `🎮 Welcome to the Number Guessing Game!\n\n` +
    `I've picked a random number between 1 and 100.\n` +
    `Try to guess it! Send me a number.`
  );
});

bot.onText(/\/newgame/, (msg) => {
  const chatId = msg.chat.id;
  const currentState = getGameState(chatId);
  
  if (currentState && currentState.active) {
    const { targetNumber, attempts } = currentState;
    bot.sendMessage(chatId, 
      `🔄 Starting a new game!\n` +
      `The previous number was ${targetNumber} and you made ${attempts} attempts.\n\n` +
      `I've picked a new number between ${currentState.min} and ${currentState.max}. Good luck!`
    );
  } else {
    bot.sendMessage(chatId, 
      `🎮 Starting a new game!\n` +
      `I've picked a random number between 1 and 100.\n` +
      `Try to guess it! Send me a number.`
    );
  }
  
  startNewGame(chatId);
});

bot.onText(/\/range (\d+) (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const min = parseInt(match[1]);
  const max = parseInt(match[2]);
  
  if (min >= max) {
    bot.sendMessage(chatId, '❌ Invalid range! The minimum number must be less than the maximum number.');
    return;
  }
  
  if (max - min > 10000) {
    bot.sendMessage(chatId, '❌ Range too large! Please keep the range under 10,000 numbers.');
    return;
  }
  
  const targetNumber = startNewGame(chatId, min, max);
  bot.sendMessage(chatId, 
    `🎯 Game range updated!\n\n` +
    `I've picked a random number between ${min} and ${max}.\n` +
    `Try to guess it! Send me a number.`
  );
});

bot.onText(/\/range$/, (msg) => {
  const chatId = msg.chat.id;
  const currentState = getGameState(chatId);
  
  if (currentState && currentState.active) {
    bot.sendMessage(chatId, 
      `📊 Current range: ${currentState.min} to ${currentState.max}\n\n` +
      `To change the range, use: /range min max\n` +
      `Example: /range 1 1000`
    );
  } else {
    bot.sendMessage(chatId, 
      `📊 No active game. Start a game first with /start or /newgame\n\n` +
      `To set a custom range, use: /range min max\n` +
      `Example: /range 1 1000`
    );
  }
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 
    `🎯 Number Guessing Game Bot\n\n` +
    `📋 Available commands:\n` +
    `/start - Start a new game (1-100)\n` +
    `/newgame - Start a fresh game\n` +
    `/range - Show current range\n` +
    `/range min max - Set custom range (e.g., /range 1 1000)\n` +
    `/help - Show this help message\n\n` +
    `🎮 How to play:\n` +
    `1. Use /start to begin a game\n` +
    `2. Send me a number as your guess\n` +
    `3. I'll respond with "higher" or "lower"\n` +
    `4. Keep guessing until you find the number!\n\n` +
    `🏆 After guessing correctly, I'll show your attempts and offer a new game.`
  );
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  if (text.startsWith('/')) {
    return;
  }
  
  const gameState = getGameState(chatId);
  
  if (!gameState || !gameState.active) {
    bot.sendMessage(chatId, 
      `🤔 No active game! Start a new game with /start or /newgame`
    );
    return;
  }
  
  const guess = parseInt(text);
  
  if (isNaN(guess)) {
    bot.sendMessage(chatId, 
      `❌ Please send a valid number!\n` +
      `Current range: ${gameState.min} to ${gameState.max}`
    );
    return;
  }
  
  if (guess < gameState.min || guess > gameState.max) {
    bot.sendMessage(chatId, 
      `❌ Please choose a number between ${gameState.min} and ${gameState.max}!`
    );
    return;
  }
  
  gameState.attempts++;
  
  if (guess === gameState.targetNumber) {
    bot.sendMessage(chatId, 
      `🎉 Congratulations! You guessed it!\n\n` +
      `🎯 The number was ${gameState.targetNumber}\n` +
      `📊 Attempts: ${gameState.attempts}\n\n` +
      `Would you like to play again? Send /newgame to start a fresh game!`
    );
    gameState.active = false;
  } else if (guess < gameState.targetNumber) {
    bot.sendMessage(chatId, 
      `📈 Higher! Try a bigger number.\n` +
      `🎯 Current range: ${gameState.min} to ${gameState.max}\n` +
      `📊 Attempts: ${gameState.attempts}`
    );
  } else {
    bot.sendMessage(chatId, 
      `📉 Lower! Try a smaller number.\n` +
      `🎯 Current range: ${gameState.min} to ${gameState.max}\n` +
      `📊 Attempts: ${gameState.attempts}`
    );
  }
});

console.log('🤖 Number Guessing Bot is running...');