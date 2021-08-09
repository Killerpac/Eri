module.exports = (client, queue) => {
    queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
}