module.exports = {
    name: 'shuffle',
    category: 'Music',
    utilisation: '/shuffle',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
  }

  if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
      return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
  }
        await interaction.deferReply({ ephemeral: true });
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const success = queue.shuffle();
        return void interaction.followUp({
            content: success ? `✅ | Shuffled The Queue` : "❌ | Something went wrong!"
    });
  }
}