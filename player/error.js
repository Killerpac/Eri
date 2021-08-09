module.exports = (client ,queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
}