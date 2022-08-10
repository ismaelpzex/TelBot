const axios = require('axios').default
module.exports = (ctx) => {
    console.log(ctx.from.first_name)
    const { first_name, username, id } = ctx.from;
    const city = ctx.message.text.split(" ").slice(1).join(" ").toLowerCase();
    const citySanitize = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const url = `${process.env.WEATHER_URL}${citySanitize}&appid=${process.env.WEATHER_TOKEN}&units=metric`
    axios.get(url)
        .then((response) => {
            const { speed } = response.data.wind
            const { temp, feels_like, temp_max, temp_min, pressure, humidity } = response.data.main;
            const icon = response.data.weather[0].icon;
            const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            ctx.replyWithPhoto(iconurl);
            ctx.reply(`@${username} AQUÍ TIENES LOS DETALLES DEL TIEMPO EN ${city.toUpperCase()}:
Temperatura: ${temp} grados 🌡

🚨 TEMPERATURA ULTIMOS 30 MINUTOS 🚨
Sensación Térmica: ${feels_like} grados ${feels_like >= 24 ? '🥵 ' : '🥶'}
Temperatura Máxima: ${temp_max} grados 🔥
Temperatura Mínima: ${temp_min} grados ❄️

Presión: ${pressure} 🌤
Humedad: ${humidity}% 💧
Visibilidad: ${response.data.visibility}m 🗻
Viento ${speed} km/h 🍃`);

        })
        // ctx.replyWithHtml(`<img src="${iconurl}">`)
        .catch((err) => {
            ctx.reply(`ERROR: ${err.message}
Asegurate de haber incluido la ciudad`);
        })
}