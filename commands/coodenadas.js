const axios = require('axios').default
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'locationiq',
    apiKey: process.env.LOCATIONIQ_TOKEN
}

const geocoder = NodeGeocoder(options);

module.exports = async (ctx) => {
    const { first_name, username, id } = ctx.from;
    const addres = ctx.message.text.split(" ").slice(1).join(" ").toLowerCase();
    const addresSanitize = addres.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const res = await geocoder.geocode({
        address: addresSanitize,
        country: 'Spain'
    });
    await ctx.reply(`SE HAN ENCONTRADO ${res.length} COINCIDENCIAS`)
    for (let value of res) {
        await ctx.reply(`Latitud: ${value.latitude}
Longitud: ${value.longitude}
Pais: ${value.country}
Ciudad: ${value.city}`)

        await ctx.replyWithLocation(value.latitude, value.longitude);
    }
};
