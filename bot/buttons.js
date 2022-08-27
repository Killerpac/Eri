const {  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
     pause() {
        const r = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('pause/resumebtn')
                .setLabel('Pause')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('skipbtn')
                .setLabel('Skip')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('stopbtn')
                .setLabel('Stop')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('queuebtn')
                .setLabel('Show Queue')
                .setStyle(ButtonStyle.Primary)
        );
        return r
    },
     resume() {
        const r = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('pause/resumebtn')
                .setLabel('Resume')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('skipbtn')
                .setLabel('Skip')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('stopbtn')
                .setLabel('Stop')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('queuebtn')
                .setLabel('Show Queue')
                .setStyle(ButtonStyle.Primary)
        );
        return r
    }
}