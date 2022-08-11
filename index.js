const express = require('express');
const { Telegraf } = require('telegraf');
const User = require('./models/user.model');

//Load .env
require('dotenv').config();

//Mongo connection
require('./config/db');

//Create app
const app = express();

//Create bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

//Bot config
app.use(bot.webhookCallback('/url_telegram'));
bot.telegram.setWebhook(`${process.env.BOT_URL}/url_telegram`);

//Telegram reqs
app.post('/url_telegram', (req, res) => {
    res.status(200).send('Fin de la petición');
});

//middleware BOT
bot.use(async (ctx, next) => {
    ctx.from.telegramId = ctx.from.id;
    try {
        const user = await User.findOne({ telegramId: ctx.from.telegramId })
        if (!user) await User.create(ctx.from);
        next();
    } catch (err) {
        console.log(err.message);
    }
})

//COMMANDS
bot.command('help', require('./commands/help'));
bot.command('test', require('./commands/test'));
bot.command('tiempo', require('./commands/tiempo'));
bot.command('coordenadas', require('./commands/coodenadas'));
bot.command('youtube', require('./commands/youtube'));
bot.command('/mensaje', require('./commands/mensaje'));

bot.on('text', require('./nlu'));

//Config PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto ' + PORT);
});