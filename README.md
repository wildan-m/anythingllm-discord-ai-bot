# Discord AI Bot

A Discord bot that integrates with AnythingLLM to provide AI-powered chat capabilities in your Discord server. The bot maintains conversation context for each user and can provide responses with source citations when available.

## Features

- 🤖 AI-powered chat responses using AnythingLLM
- 💬 Maintains conversation context per user
- 📚 Provides source citations when available
- 🔒 Secure API key handling through environment variables
- 🎯 Simple mention-based interaction

## Prerequisites

- Node.js (v14 or higher)
- A Discord bot token
- AnythingLLM API key
- AnythingLLM instance running (default: http://localhost:3001)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/discord-ai-bot.git
cd discord-ai-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DISCORD_TOKEN=your_discord_bot_token
ANYTHINGLLM_API_KEY=your_anythingllm_api_key
```

## Usage

1. Start the bot:
```bash
node bot.js
```

2. In your Discord server, mention the bot with your message to get an AI response:
```
@YourBotName What is the capital of France?
```

The bot will respond with an AI-generated answer and include any relevant sources if available.

## Configuration

The bot uses the following default configuration:
- AnythingLLM API URL: `http://localhost:3001/api/v1/workspace/wildevworkspave/chat`
- Conversation mode: Chat (maintains context)
- Session management: Uses Discord user ID for conversation tracking

## Dependencies

- discord.js: ^14.19.3
- axios: ^1.9.0
- dotenv: ^16.5.0

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests! 