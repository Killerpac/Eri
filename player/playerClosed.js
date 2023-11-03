module.exports = async (client, player) => {
    client.channels.cache.get(player.textId).send({embeds:[{description:`❌ | I was disconnected from the voice channel`,color:`${client.colour}`}]});
    try{
        let x = client.config.discord.ne.find(e => e.guildId == player.guildId);
        if (x) { 
            x.delete()
            let y = client.config.discord.ne.indexOf(x)
            client.config.discord.ne.splice(y, 1)
        }
    }
    catch {
        client.channels.cache.get(player.textId).send({embeds:[{description:`❌ | Something went wrong!`,color:`${client.colour}`}]});
    }
}