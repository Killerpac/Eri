const { MessageActionRow, MessageButton } = require('discord.js');
const pause = require('../bot/buttons').pause();
module.exports = (client, player, track) => {
    const row = pause
    client.channels.cache.get(player.textId)?.send({embeds:[{title:`🎶 | Now Playing`,description:`[${track.title}](${track.realUri}) in **${client.channels.cache.get(player.voiceId).name}**!`,color:`${client.colour}`,thumbnail:{url:track.thumbnail}}],components: [row]}).then(mes => {
        client.config.discord.ne.push(mes);
    })
}