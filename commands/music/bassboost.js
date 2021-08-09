module.exports = {
    name: 'bassboost',
    category: 'Music',
    utilisation: '/bassboost',

   async execute(client, interaction) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    await queue.setFilters({
        bassboost: !queue.getFiltersEnabled().includes("bassboost"),
        normalizer2: !queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
    });

    return void interaction.followUp({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "Enabled" : "Disabled"}!` });
    }
}