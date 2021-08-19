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
        await interaction.deleteReply()
        const query = interaction.options.get("query").value;
        client.player.playVoiceChannel(interaction.member.voice.channel, `${query}`,{textChannel: interaction.channel})
    }
}