module.exports = {
    name: 'stop',
    category: 'Music',
    utilisation: '/stop',

   async execute(client, interaction) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    queue.destroy();
    return void interaction.followUp({ content: "🛑 | Stopped the player!" });
   }
}