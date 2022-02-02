const { MessageActionRow, MessageButton } = require('discord.js');
const pause = require('../bot/buttons').pause();
module.exports = (client, queue, song) => {
    const row = pause
    queue.textChannel.send({embeds:[{title:`🎶 | Now Playing`,description:`[${song.name}](${song.url}) in **${queue.voiceChannel.name}**!`,color:`${client.colour}`,thumbnail:{url:song.thumbnail}}],components: [row]}).then(mes => {
        client.config.discord.ne.push(mes);
    })
}