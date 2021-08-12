module.exports = (client, queue, track) => {
    queue.metadata.send({embeds:[{title:`🎶 | Now Playing`,description:`[${track.title}](${track.url}) in **${queue.connection.channel.name}**!`,color:`${client.colour}`}]}).then(mes => {
        client.config.discord.ne.push(mes);
    })
}