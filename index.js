const express = require('express');
const { Telegraf } = require('telegraf');

//Load .env
require('dotenv').config();

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

//COMMANDS
bot.command('test', require('./commands/test'));
bot.command('tiempo', require('./commands/tiempo'));
bot.command('/coordenadas', require('./commands/coodenadas'));

//Config PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto ' + PORT);
});