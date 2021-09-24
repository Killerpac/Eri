module.exports = async (client, queue) => {
    queue.textChannel.send({embeds:[{description:`✅ | No More Songs to Play!`,color:`${client.colour}`}]});
    let x = client.config.discord.ne.find(e => e.guildId == queue.textChannel.guild.id);
    if (x) { 
        x.delete()
        let y = client.config.discord.ne.indexOf(x)
        client.config.discord.ne.splice(y, 1)
    }
    setTimeout()
}