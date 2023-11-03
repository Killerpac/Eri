module.exports = (client ,player, stuck) => {
    console.log(`Error emitted from the queue: ${stuck}`);
    try{
        client.channels.cache.get(player.textId).send({embeds:[{description:`❌ | I Crashed HELP!!!!!`,color:`${client.colour}`}]});
        let x = client.config.discord.ne.find(e => e.guildId == player.guildId);
        if (x) { 
            x.delete()
            let y = client.config.discord.ne.indexOf(x)
            client.config.discord.ne.splice(y, 1)
        }
    }
    catch {
        client.channels.cache.get(player.textId).send({embeds:[{description:`❌ | I Crashed HELP!!!!!`,color:`${client.colour}`}]});
    }
}