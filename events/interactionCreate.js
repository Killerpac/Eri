const skip = require("../commands/music/skip")
const pause = require("../commands/music/pause")
const resume = require("../commands/music/resume")
const stop = require("../commands/music/stop")
const queue = require("../commands/music/queue")

module.exports = async (client,interaction) =>
{
    //buttom names pause/resumebtn,skipbtn,stopbtn,queuebtn
    if(interaction.isButton()) {
        if(interaction.customId == "pause/resumebtn")
        {
            const queue = client.player.getQueue(interaction.guildId);
            if(queue.paused) {
                resume.execute(client,interaction);
            }
            else {
                pause.execute(client,interaction);
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
    if (!interaction.isCommand() || !interaction.guildId) return;

	if (!client.commands.has(interaction.commandName)) return;

	const cmd = client.commands.get(interaction.commandName);

    if(cmd) cmd.execute(client, interaction);

}