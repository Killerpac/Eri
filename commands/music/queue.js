const { GuildMember } = require("discord.js");
module.exports = {
    name: 'queue',
    category: 'Music',
    utilisation: '/queue',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me?.voice?.channelId && interaction.member?.voice?.channelId !== interaction.guild.me?.voice?.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }
    await interaction.deferReply();
    const queue = client.player.getPlayer(interaction.guildId).queue;
    const player = client.player.getPlayer(interaction.guildId);
    if (!player || !player.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const currentsong = queue.current;
    const songs = queue.slice(0, 10).map((m, i) => {
        return `${i + 1}. **${m.title}**`;
    });

    return void interaction.followUp({
        embeds: [
            {
                title: "Server Queue",
                description: `${songs.join("\n")}${
                    queue.length > songs.length
                        ? `\n...${queue.length - songs.length === 1 ? `${queue.length - songs.length} more song` : `${queue.length - songs.length} more songs`}`
                        : ""
                }`,
                color: client.colour,
                fields: [{ name: "Now Playing", value: `🎶 | **${currentsong.title}**` }]
            }
        ]
    })
  }
}