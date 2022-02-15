const skip = require("../commands/music/skip")
const skipto = require("../commands/music/skipto")
const stop = require("../commands/music/stop")
const queue = require("../commands/music/queue")
const pp = require('../bot/buttons')
const {  GuildMember } = require('discord.js')
module.exports = async (client,interaction) =>
{
    const query = client.player.getQueue(interaction.guildId);
    //buttom names pause/resumebtn,skipbtn,stopbtn,queuebtn
    if(interaction.isButton()) {
        if(interaction.customId == "pause/resumebtn")
        {
            if(query.paused) {
                if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
                    return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                }
            
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
                    return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                }
                        if (!query|| !query.paused) return void interaction.reply({ content: "❌ | No music is being played!" });
                        query.resume();
                        return void  interaction.update({
                            components:[pp.pause()]
                        })
               }
            else {
                if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
                    return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
                }
            
                if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
                    return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
                }
                        if (!query|| !query.playing) return void interaction.reply({ content: "❌ | No music is being played!" });
                        query.pause();
                        return void  interaction.update({
                            components:[pp.resume()]
                        })
            }
        }
        else if(interaction.customId == "skipbtn")
        {
            skip.execute(client,interaction);
        }
        else if(interaction.customId == "stopbtn")
        {
            stop.execute(client,interaction);
        }
        else if(interaction.customId == "queuebtn")
        {
            queue.execute(client,interaction);
        }  
    }
    if (interaction.isSelectMenu()) {
        if(interaction.customId === "Qselect"){
            skipto.execute(client,interaction);
        }
    }

    if (!interaction.isCommand() || !interaction.guildId) return;

	if (!client.commands.has(interaction.commandName)) return;

	const cmd = client.commands.get(interaction.commandName);

    if(cmd) cmd.execute(client, interaction);
}