const { GuildMember } = require("discord.js");
module.exports = {
    name: 'skip',
    category: 'Music',
    utilisation: '/skip',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me?.voice?.channelId && interaction.member?.voice?.channelId !== interaction.guild.me?.voice?.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }
            await interaction.deferUpdate();
            const queue = client.player.getQueue(interaction.guildId);
            if (!queue || !queue.playing) return void interaction.channel.send({ content: "❌ | No music is being played!" });
            const currentTrack = queue.songs[0];
            if(!queue.autoplay)
            {
            if(queue.songs.length <=1) return void interaction.channel.send({ content: "❌ | Queue is Empty!! Add Some Music" });
            }
            const success = queue.skip();
            // return void interaction.channel.send({
            //     content: success ? `✅ | Skipped **${currentTrack.name}**!` : "❌ | Something went wrong!"
            
            return void interaction.channel.send({embeds: success ? [{description:`✅ | Skipped **${currentTrack.name}**!`,color:`${client.colour}`}] : [{description:`❌ | Something went wrong!`,color:`${client.colour}`}]
        });
    }
}