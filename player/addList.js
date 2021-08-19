module.exports = (client, queue, playlist) => {
    queue.textChannel.send({embeds:[{description:`🎶 | Added [${playlist.name}](${playlist.url}) in **${queue.textChannel.name}**!`,color:`${client.colour}`}]});
}