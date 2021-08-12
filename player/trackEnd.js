module.exports = (client, queue, track) => {
    let x = client.config.discord.ne.find(e => e.guildId == queue.metadata.guildId)
    if (x) { 
        x.delete()
        let y = client.config.discord.ne.indexOf(x)
        client.config.discord.ne.splice(y, 1)
    }
}
