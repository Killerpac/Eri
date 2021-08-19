module.exports = (client, queue) => {
    queue.textChannel.send({embeds:[{description:`❌ | Nobody is in the voice channel, leaving...`,color:`${client.colour}`}]});
}