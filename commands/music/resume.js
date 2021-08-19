const { GuildMember } = require("discord.js");
module.exports = {
    name: 'resume',
    category: 'Music',
    utilisation: '/resume',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }
    await interaction.deferReply();
            const queue = client.player.getQueue(interaction.guildId);
            if (!queue || !queue.paused) return void interaction.followUp({ content: "❌ | No music is being played!" });
            const success = queue.resume();
            return void interaction.followUp({ content: success ? "▶ | Resumed!" : "❌ | Something went wrong!" });
   }
}