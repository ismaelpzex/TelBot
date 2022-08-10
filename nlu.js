const { Wit, log } = require('node-wit');
const client = new Wit({
    accessToken: process.env.WIT_TOKEN,
    logger: new log.Logger(log.DEBUG)
});

module.exports = async (ctx) => {
    const response = await client.message(ctx.message.text);
    if (response.intents.length === 0 || response.intents[0].confidence < 0.75) ctx.reply('No he entendido el mensaje')
}