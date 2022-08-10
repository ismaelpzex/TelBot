//


const axios = require('axios').default
module.exports = async (ctx) => {
    const { first_name, username, id } = ctx.from;
    const query = ctx.message.text.split(" ").slice(1).join(" ").toLowerCase();
    const querySanitizer = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "-");
    const url = 'https://www.googleapis.com/youtube/v3/search?' + process.env.YT_TOKEN + '&type=video&part=snippet&q=' + querySanitizer

    axios(url)
        .then(async (response) => {
            const items = response.data.items
            ctx.reply(`Se han encontrado ${items.length} coincidencias sobre la búsqueda ${querySanitizer}`);
            for (let video of items) {
                const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`
                await ctx.reply(videoUrl);
            };
        })
        .catch((err) => {
            console.log(err.message);
        })
};
