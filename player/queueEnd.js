module.exports = async (client, queue) => {
    queue.metadata.send({embeds:[{description:`✅ | No More Songs to Play!`,color:`${client.colour}`}]});
}