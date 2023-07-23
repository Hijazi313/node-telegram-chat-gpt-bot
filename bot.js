import "dotenv/config"
import Telegram from "node-telegram-bot-api"
import {Configuration, OpenAIApi} from "openai"

const BOT_TOKEN = process.env.BOT_TOKEN
const OPEN_AI_TOKEN = process.env.OPEN_AI_TOKEN

const openAiConfig = new Configuration({
    apiKey:OPEN_AI_TOKEN
})

const openAi = new OpenAIApi(openAiConfig)
const bot = new Telegram(BOT_TOKEN, {polling:true})

try{

bot.on("message",async (message)=>{
    const chatId = message.chat.id;
    const reply = await openAi.createChatCompletion({
        max_tokens:100,
        model:"ada",
        prompt:message.text,
        temperature:0.5,

    });

    bot.sendMessage(chatId,reply.data.choices[0].text)
})
}catch(err){
    throw new Error(err.response.data)
}
