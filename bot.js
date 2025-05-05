const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config(); // Add this to load environment variables

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages]
});

const ANYTHINGLLM_API_URL = 'http://localhost:3001/api/v1/workspace/wildevworkspave/chat'; // Adjust if using Docker

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots to prevent loops
  if (message.author.bot) return;
  
  // Check if the bot is mentioned in the message
  const isBotMentioned = message.mentions.users.has(client.user.id);
  
  if (!isBotMentioned) return;

  // Remove the mention and get just the prompt
  const prompt = message.content
    .replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '')
    .trim();

  try {
    const response = await axios.post(ANYTHINGLLM_API_URL, {
      message: prompt,
      mode: "chat", // Use "chat" mode to leverage LLM with chat history
      sessionId: message.author.id, // Use the user's Discord ID as session ID to maintain conversation context
      reset: false // Don't reset the conversation history
    }, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANYTHINGLLM_API_KEY}` // Add API key in header
      }
    });

    // Handle the proper response format
    if (response.data.error && response.data.error !== "null") {
      throw new Error(response.data.error);
    }

    // Check if response is aborted
    if (response.data.type === "abort") {
      message.reply("The AI system couldn't process your request.");
      return;
    }

    // Extract main response
    const aiResponse = response.data.textResponse || 'No response from AI.';
    
    // Format sources if available
    let formattedResponse = aiResponse;
    if (response.data.sources && response.data.sources.length > 0) {
      formattedResponse += "\n\n**Sources:**";
      response.data.sources.forEach(source => {
        formattedResponse += `\n- **${source.title}**`;
      });
    }

    message.reply(formattedResponse);
  } catch (error) {
    console.error("Error:", error.message);
    message.reply(`Error communicating with AI: ${error.message}`);
  }
});

// Use environment variable for the token
client.login(process.env.DISCORD_TOKEN);