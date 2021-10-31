const { GuildMember } = require("discord.js");
module.exports = {
    name: 'bassboost',
    category: 'Music',
    utilisation: '/bassboost',

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
    await queue.filters.includes("bassboost") ? queue.setFilter(false): queue.setFilter("bassboost");
    return void interaction.followUp({ content: `🎵 | Bassboost ${queue.filters.includes("bassboost") ? "Enabled" : "Disabled"}!` });
    }
}