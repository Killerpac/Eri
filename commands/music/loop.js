const { GuildMember } = require("discord.js");
module.exports = {
    name: 'loop',
    category: 'Music',
    utilisation: '/loop [loopType]',

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
    const loopMode = interaction.options.get("mode").value;
    const success = queue.setRepeatMode(loopMode);
    const mode = loopMode === client.QueueRepeatMode.TRACK ? "🔂" : loopMode === client.QueueRepeatMode.QUEUE ? "🔁" : "▶";
    return void interaction.followUp({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
   }
}