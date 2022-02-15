const { GuildMember } = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
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
        const songs = queue.songs.slice(0, 40).map((m, i) => {
            if (i === 0) return `▶️ ${currentsong.name}`
            return `${m.name}`;
        });



        return void interaction.channel.send({
            content: "Music queue",
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId('Qselect')
                        .setPlaceholder(currentsong.name)
                        .addOptions([...songs.map((s, i) => ({
                            label: s.substring(0, 30),
                            description: `Play ${s.substring(0, 20)}`,
                            value: `${i}`,
                        }))
                    ])
                )
            ]

        })
    }
}