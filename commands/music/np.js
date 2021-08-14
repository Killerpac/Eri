module.exports = {
    name: 'np',
    category: 'Music',
    utilisation: '/np',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    return void interaction.followUp({
        embeds: [
            {
                title: "Now Playing",
                description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                fields: [
                    {
                        name: "\u200b",
                        value: progress
                    }
                ],
                color: client.colour
            }
        ]
    });
}
}