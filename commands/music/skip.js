module.exports = {
    name: 'skip',
    category: 'Music',
    utilisation: '/skip',

   async execute(client, interaction) {
            await interaction.deferReply({ ephemeral: true });
            const queue = client.player.getQueue(interaction.guildId);
            if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
            const currentTrack = queue.current;
            const success = queue.skip();
            return void interaction.followUp({
                content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
        });
    }
}