module.exports = {
    name: 'queue',
    category: 'Music',
    utilisation: '/queue',

   async execute(client, interaction) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
        return `${i + 1}. **${m.title}**`;
    });

    return void interaction.followUp({
        embeds: [
            {
                title: "Server Queue",
                description: `${tracks.join("\n")}${
                    queue.tracks.length > tracks.length
                        ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}`
                        : ""
                }`,
                color: colour,
                fields: [{ name: "Now Playing", value: `🎶 | **${currentTrack.title}**` }]
            }
        ]
    })
  }
}