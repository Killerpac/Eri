module.exports = async (client, queue) => {
    queue.metadata.send("✅ | No More Songs to Play!");
}