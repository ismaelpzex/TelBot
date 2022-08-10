module.exports = (ctx) => {
    console.log(ctx.message);
    ctx.reply('Whats up nigga!!');
    ctx.replyWithDice();
};