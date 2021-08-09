module.exports = (client, queue) => {
    queue.metadata.send({embeds:[{description:`❌ | Nobody is in the voice channel, leaving...`,color:`${client.colour}`}]});
}