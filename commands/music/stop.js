const { GuildMember } = require("discord.js");
module.exports = {
    name: 'stop',
    category: 'Music',
    utilisation: '/stop',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me?.voice?.channelId && interaction.member?.voice?.channelId !== interaction.guild.me?.voice?.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }
    await interaction.deferReply();
    const Player = client.player.getPlayer(interaction.guildId);
    if (!Player || !Player.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const success = Player.destroy();
    if (success) interaction.deleteReply();
   }
}