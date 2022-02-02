module.exports = (client, queue) => {
    try{
        let x = client.config.discord.ne.find(e => e.guildId == queue.textChannel.guild.id);
        if (x) { 
            x.delete()
            let y = client.config.discord.ne.indexOf(x)
            client.config.discord.ne.splice(y, 1)
        }
    }
    catch {
        queue.textChannel.send({embeds:[{description:`❌ | Something went wrong!`,color:`${client.colour}`}]});
    }
}