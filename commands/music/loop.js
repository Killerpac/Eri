const { GuildMember } = require("discord.js");
module.exports = {
    name: 'loop',
    category: 'Music',
    utilisation: '/loop [loopType]',

   async execute(client, interaction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me?.voice?.channelId && interaction.member?.voice?.channelId !== interaction.guild.me?.voice?.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }
    await interaction.deferReply();
    const player = client.player.getPlayer(interaction.guildId);
    if (!player || !player.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const loopMode = interaction.options.get("mode").value;
    const modes = ["none", "track", "queue"];
    const success = player.setLoop(modes[loopMode]);
    return void interaction.followUp({ content: success ? `${modes[loopMode]} | Updated loop mode!` : "❌ | Could not update loop mode!" });
   }
}