module.exports = (client, queue, song) => {
    queue.textChannel.send({embeds:[{title:`🎶 | Now Playing`,description:`[${song.name}](${song.url}) in **${queue.voiceChannel.name}**!`,color:`${client.colour}`}]}).then(mes => {
        client.config.discord.ne.push(mes);
    })
}