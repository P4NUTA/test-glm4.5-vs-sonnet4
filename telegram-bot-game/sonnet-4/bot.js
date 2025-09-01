const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
    console.error('TELEGRAM_BOT_TOKEN environment variable is required');
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const games = new Map();

class NumberGuessingGame {
    constructor(chatId, min = 1, max = 100) {
        this.chatId = chatId;
        this.min = min;
        this.max = max;
        this.secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.attempts = 0;
        this.isActive = true;
    }

    makeGuess(guess) {
        if (!this.isActive) {
            return { status: 'game_over', message: 'Game is not active. Start a new game with /newgame' };
        }

        const num = parseInt(guess);
        if (isNaN(num)) {
            return { status: 'invalid', message: 'Please enter a valid number.' };
        }

        if (num < this.min || num > this.max) {
            return { 
                status: 'out_of_range', 
                message: `Please enter a number between ${this.min} and ${this.max}.` 
            };
        }

        this.attempts++;

        if (num === this.secretNumber) {
            this.isActive = false;
            return {
                status: 'win',
                message: `🎉 Correct! You guessed it in ${this.attempts} attempts!\n\nThe number was ${this.secretNumber}. Would you like to play again? Use /newgame to start another round.`
            };
        } else if (num < this.secretNumber) {
            return { status: 'higher', message: '📈 Higher!' };
        } else {
            return { status: 'lower', message: '📉 Lower!' };
        }
    }

    setRange(min, max) {
        if (min >= max) {
            return { success: false, message: 'Minimum must be less than maximum.' };
        }
        if (min < 1 || max > 1000000) {
            return { success: false, message: 'Range must be between 1 and 1,000,000.' };
        }
        
        this.min = min;
        this.max = max;
        this.secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.attempts = 0;
        this.isActive = true;
        
        return { 
            success: true, 
            message: `🎯 New game started! I'm thinking of a number between ${min} and ${max}. Make your guess!` 
        };
    }
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const game = new NumberGuessingGame(chatId);
    games.set(chatId, game);
    
    bot.sendMessage(chatId, 
        `🎮 Welcome to the Number Guessing Game!\n\n` +
        `I'm thinking of a number between ${game.min} and ${game.max}. Try to guess it!\n\n` +
        `Commands:\n` +
        `• Send any number to make a guess\n` +
        `• /newgame - Start a new game\n` +
        `• /range <min> <max> - Set custom range (e.g., /range 1 1000)\n` +
        `• /help - Show this help message\n\n` +
        `Good luck! 🍀`
    );
});

bot.onText(/\/newgame/, (msg) => {
    const chatId = msg.chat.id;
    
    const existingGame = games.get(chatId);
    const min = existingGame ? existingGame.min : 1;
    const max = existingGame ? existingGame.max : 100;
    
    const game = new NumberGuessingGame(chatId, min, max);
    games.set(chatId, game);
    
    bot.sendMessage(chatId, 
        `🎯 New game started! I'm thinking of a number between ${min} and ${max}. Make your guess!`
    );
});

bot.onText(/\/range (\d+) (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const min = parseInt(match[1]);
    const max = parseInt(match[2]);
    
    let game = games.get(chatId);
    if (!game) {
        game = new NumberGuessingGame(chatId);
        games.set(chatId, game);
    }
    
    const result = game.setRange(min, max);
    bot.sendMessage(chatId, result.message);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId,
        `🎮 Number Guessing Game - Help\n\n` +
        `How to play:\n` +
        `• I think of a random number in a range (default 1-100)\n` +
        `• You guess numbers, and I'll tell you if you need to go higher or lower\n` +
        `• Keep guessing until you find the correct number!\n\n` +
        `Commands:\n` +
        `• /start - Start your first game\n` +
        `• /newgame - Start a new game with current range\n` +
        `• /range <min> <max> - Set custom range (1-1,000,000)\n` +
        `• /help - Show this help message\n\n` +
        `Just send any number to make a guess! 🎯`
    );
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if (text && text.startsWith('/')) {
        return;
    }
    
    if (!text || isNaN(text)) {
        return;
    }
    
    let game = games.get(chatId);
    if (!game) {
        bot.sendMessage(chatId, 
            `Welcome! Please start a new game first with /start or /newgame.`
        );
        return;
    }
    
    const result = game.makeGuess(text);
    bot.sendMessage(chatId, result.message);
});

bot.on('polling_error', (error) => {
    console.log('Polling error:', error);
});

console.log('🤖 Telegram Number Guessing Game Bot is running...');
console.log('Make sure to set your TELEGRAM_BOT_TOKEN environment variable');