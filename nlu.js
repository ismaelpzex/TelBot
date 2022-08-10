const { Wit, log } = require('node-wit');
const client = new Wit({
    accessToken: process.env.WIT_TOKEN,
    logger: new log.Logger(log.DEBUG)
});

module.exports = async (ctx) => {
    const response = await client.message(ctx.message.text);
    console.log(response)
    if (response.intents.length === 0 || response.intents[0].confidence < 0.90) return

    if (response.intents[0].name === 'saludo') ctx.reply(`Hola @${ctx.message.from.username} me alegro de verte`);
    if (response.intents[0].name === 'despedida') ctx.reply(`Nos vemos @${ctx.message.from.username} ha sido un placer`);

    if (response.intents[0].name === 'insulto') ctx.reply(` @${ctx.message.from.username} no insultes, queda feo`);

    if (response.intents[0].name === 'preguntas') ctx.reply(` @${ctx.message.from.username} creo sin duda que es la mejor pregunta planteada en el canal hasta ahora`);
}