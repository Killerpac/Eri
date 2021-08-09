module.exports = {
    name: 'loop',
    category: 'Music',
    utilisation: '/loop [loopType]',

   async execute(client, interaction) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const loopMode = interaction.options.get("mode").value;
    const success = queue.setRepeatMode(loopMode);
    const mode = loopMode === client.QueueRepeatMode.TRACK ? "🔂" : loopMode === client.QueueRepeatMode.QUEUE ? "🔁" : "▶";
    return void interaction.followUp({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
   }
}