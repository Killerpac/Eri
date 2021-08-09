module.exports = {
    name: 'pause',
    category: 'Music',
    utilisation: '/pause',

   async execute(client, interaction) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const success = queue.setPaused(true);
    return void interaction.followUp({ content: success ? "▶ | Paused!" : "❌ | Something went wrong!" });
   }
}
