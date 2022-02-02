const { MessageActionRow , MessageButton } = require('discord.js');
module.exports = {
     pause() {
        const r = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('pause/resumebtn')
                .setLabel('Pause')
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
        return r
    },
     resume() {
        const r = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('pause/resumebtn')
                .setLabel('Resume')
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
        return r
    }
}