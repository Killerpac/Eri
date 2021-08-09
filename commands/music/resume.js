module.exports = {
    name: 'resume',
    category: 'Music',
    utilisation: '/resume',

   async execute(client, interaction) {
    await interaction.deferReply();
            const queue = client.player.getQueue(interaction.guildId);
            if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
            const success = queue.setPaused(false);
            return void interaction.followUp({ content: success ? "▶ | Resumed!" : "❌ | Something went wrong!" });
   }
}