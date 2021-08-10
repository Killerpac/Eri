module.exports = (client, queue, track) => {
    queue.metadata.send({embeds:[{description:`[${track.title}](${track.url}) Queued`,color:`${client.colour}`}]})
}
