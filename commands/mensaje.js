const User = require('../models/user.model');
module.exports = async (ctx) => {
    const mensaje = ctx.message.text.split('/mensaje')[1];
    const count = await User.count();
    const randomNum = Math.floor(Math.random() * count);
    const user = await User.findOne().skip(randomNum);
    console.log(user);
    ctx.telegram.sendMessage(user.telegramId, mensaje);
    ctx.reply(`El mensaje se ha enviado a un usuario aleatorio`);
}