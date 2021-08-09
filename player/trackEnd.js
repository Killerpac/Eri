module.exports = (client,queue,track) => {
    const x =client.config.discord.client.map(m => m.guild == queue.metadata.guild)
    x.delete()
}