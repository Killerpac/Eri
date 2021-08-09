module.exports = async (client,queue,track) => {
    const x =client.config.discord.ne.find(m => m.guild == queue.metadata.guild)
    await x.delete();
}