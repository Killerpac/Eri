module.exports = (client, queue, song) => {
    queue.textChannel.send({embeds:[{description:`[${song.name}](${song.url}) Queued`,color:`${client.colour}`}]})
}
