const {  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
     pause() {
        const r = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('voldownbtn')
                .setLabel('Volume Down')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pause/resumebtn')
                .setLabel('Pause')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('skipbtn')
                .setLabel('Skip')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('stopbtn')
                .setLabel('Stop')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('volupbtn')
                .setLabel('Volume Up')
                .setStyle(ButtonStyle.Primary),
        );
        return r
    },
     resume() {
        const r = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('voldownbtn')
                .setLabel('Volume Down')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('pause/resumebtn')
                .setLabel('Resume')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('skipbtn')
                .setLabel('Skip')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('stopbtn')
                .setLabel('Stop')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('volupbtn')
                .setLabel('Volume Up')
                .setStyle(ButtonStyle.Primary),
        );
        return r
    }
}