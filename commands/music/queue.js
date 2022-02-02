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
    await interaction.deferUpdate();
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.channel.send({ content: "❌ | No music is being played!" });
    const currentsong = queue.songs[0];
    const songs = queue.songs.slice(0, 10).map((m, i) => {
        return `${i + 1}. **${m.name}**`;
    });

    return void interaction.channel.send({
        embeds: [
            {
                title: "Server Queue",
                description: `${songs.join("\n")}${
                    queue.songs.length > songs.length
                        ? `\n...${queue.songs.length - songs.length === 1 ? `${queue.songs.length - songs.length} more song` : `${queue.songs.length - songs.length} more songs`}`
                        : ""
                }`,
                color: client.colour,
                fields: [{ name: "Now Playing", value: `🎶 | **${currentsong.name}**` }]
            }
        ]
    })
  }
}