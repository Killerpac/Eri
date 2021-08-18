const { GuildMember } = require("discord.js");
module.exports = {
    name: 'queue',
    category: 'Music',
    utilisation: '/queue',

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
                color: client.colour,
                fields: [{ name: "Now Playing", value: `🎶 | **${currentTrack.title}**` }]
            }
        ]
    })
  }
}