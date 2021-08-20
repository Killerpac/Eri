module.exports = async (client, queue) => {
    queue.textChannel.send({embeds:[{description:`❌ | I was disconnected from the voice channel`,color:`${client.colour}`}]});
    let x = client.config.discord.ne.find(e => e.guildId == queue.textChannel.guild.id);
    if (x) { 
        x.delete()
        let y = client.config.discord.ne.indexOf(x)
        client.config.discord.ne.splice(y, 1)
    }
}