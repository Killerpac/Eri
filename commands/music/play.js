const { GuildMember } = require("discord.js");
module.exports = {
    name: 'play',
    category: 'Music',
    utilisation: '/play [name/URL]',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }
        await interaction.deferReply()
        const query = interaction.options.get("query").value;
        const searchResult = await client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: interaction.commandName === "soundcloud" ? client.QueryType.SOUNDCLOUD_SEARCH : client.QueryType.AUTO
            })
            .catch(() => {});
        if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: "No results were found!" , ephemeral: true });

        const queue = await client.player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            leaveOnEmpty: true,
            leaveOnStop: true,
            leaveOnEnd: true,
            leaveOnEmptyCooldown: 30000,
            ytdlOptions:{
                quality:highestaudio,
            }
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            void client.player.deleteQueue(interaction.guildId);
            return void interaction.followUp({ content: "Could not join your voice channel!" });
        }

        await interaction.deleteReply()
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
}