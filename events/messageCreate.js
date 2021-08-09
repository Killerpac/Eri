const { QueueRepeatMode } = require("discord-player");
module.exports = async (client,message) => {
        if (message.author.bot || message.channel.type === 'dm') return;
        if (message.author.bot || !message.guild) return;
        if (!client.application?.owner) await client.application?.fetch();

        if (message.content === "!deploy" && message.author.id === client.application?.owner?.id) {
            await message.guild.commands.set([]);

        await message.reply("Deployed!");
    }
}
