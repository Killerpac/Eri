module.exports = async (client, queue) => {
    queue.metadata.send({embeds:[{description:`❌ | I was manually disconnected from the voice channel, clearing queue!`,color:`${client.colour}`}]});
}