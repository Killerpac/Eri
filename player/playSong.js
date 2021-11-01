const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = (client, queue, song) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('pause/resumebtn')
            .setLabel('Pause/Resume')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('skipbtn')
            .setLabel('Skip')
            .setStyle('SECONDARY'),
        new MessageButton()
            .setCustomId('stopbtn')
            .setLabel('Stop')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('queuebtn')
            .setLabel('Show Queue')
            .setStyle('PRIMARY')
    );
    queue.textChannel.send({embeds:[{title:`🎶 | Now Playing`,description:`[${song.name}](${song.url}) in **${queue.voiceChannel.name}**!`,color:`${client.colour}`}],components: [row]}).then(mes => {
        client.config.discord.ne.push(mes);
    })
}