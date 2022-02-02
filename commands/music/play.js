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
        const success = client.player.play(interaction.member.voice.channel, `${query}`,{textChannel: interaction.channel})
        if (success) interaction.deleteReply();
        if(client.timeout){
            clearTimeout(client.timeout)
            client.timeout = false
        }
    }
}