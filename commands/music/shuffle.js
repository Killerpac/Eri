module.exports = {
    name: 'shuffle',
    category: 'Music',
    utilisation: '/shuffle',

   async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const success = queue.shuffle();
        return void interaction.followUp({
            content: success ? `✅ | Shuffled The Queue` : "❌ | Something went wrong!"
    });
  }
}