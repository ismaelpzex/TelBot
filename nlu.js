const { Wit, log } = require('node-wit');
const fs = require('fs-extra');
const googleTTS = require('google-tts-api')
const client = new Wit({
    accessToken: process.env.WIT_TOKEN,
    logger: new log.Logger(log.DEBUG)
});

module.exports = async (ctx) => {
    const response = await client.message(ctx.message.text);
    console.log(response)
    if (response.intents.length === 0 || response.intents[0].confidence < 0.85) return
    else {
        const intent = response.intents[0].name;
        const content = await fs.readFile(`./phrases/${intent}.txt`, 'utf-8');
        const arrFrases = content.split('\n');
        const randomNum = Math.floor(Math.random() * arrFrases.length);
        const audiourl = googleTTS.getAudioUrl(arrFrases[randomNum], {
            lang: 'es',
            slow: false
        });
        ctx.reply(arrFrases[Math.floor(Math.random() * arrFrases.length)]);
        // ctx.replyWithAudio(audiourl);
    }
}