// @srart24
require('./setting/setting.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { Telegraf, Markup } = require('telegraf');
const { Configuration, OpenAIApi } = require ('openai');


// Configuration

const bot = new Telegraf(botToken);

const configuration = new Configuration({
        apiKey: KeyGpt, 
        organization: Org,
      });
            

async function aichat(text){
const openai = new OpenAIApi(configuration);
  
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.5,
    max_tokens: 2000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    });
  
let dat = `${response.data.choices[0].text}\n\n`
let data = dat.replace(/\n\n/gi, '\n')
return data
  
}

const bts = "==============================="

//// Inti 


bot.use((ctx, next) => {
    console.log(bts)
    console.log(ctx.chat)
    console.log(bts)
  next();
})



bot.hears(['/info'], (ctx) => {
	ctx.reply("Bot Ini Di Buat Pada Hari:\n\nMinggu 3, april, 2023\n", {
		"reply_markup":{
			"inline_keyboard": [[
			{"text":"Instagram", "url": 'https://instagram.com/srart24'},
      {"text":"Source Code", "url": 'https://github.com/srart24/Bot-Telegram-Chatgpt'}
			]]
		}
	})
})


bot.start((ctx) => ctx.reply('Note: gunakan tanda tanya di akhir pertanyaan anda\n\n contoh: cara memasak telor mata bulat?'));

bot.on('text', (ctx) => {
if (ctx.message.text.endsWith('?')) {
aichat(ctx.message.text).then((response) => {
    ctx.reply(response);
  }).catch((err) => {
    ctx.reply("maaf Saya tidak bisa menjawab nya")
    console.log(err);
  });
} else return
  
})



  
bot.launch({
	dropPendingUpdates: true,
})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


  
app.get('/', (req, res) => res.send("Bot By; @srart24"))

app.listen(port, () => {
  console.log(`Http://localhost:${port}`)
})
