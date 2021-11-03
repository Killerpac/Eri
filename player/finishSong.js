module.exports = (client, queue) => {
    let x = client.config.discord.ne.find(e => e.guildId == queue.textChannel.guildId);
    if (x) { 
        x.delete()
        let y = client.config.discord.ne.indexOf(x)
        client.config.discord.ne.splice(y, 1)
    }
}