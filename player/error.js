module.exports = (client ,queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    try{
        queue.textChannel.send({embeds:[{description:`❌ | I Crashed HELP!!!!!`,color:`${client.colour}`}]});
        let x = client.config.discord.ne.find(e => e.guildId == queue.textChannel.guild.id);
        if (x) { 
            x.delete()
            let y = client.config.discord.ne.indexOf(x)
            client.config.discord.ne.splice(y, 1)
        }
    }
    catch {
        queue.textChannel.send({embeds:[{description:`❌ | I Crashed HELP!!!!!`,color:`${client.colour}`}]});
    }
}