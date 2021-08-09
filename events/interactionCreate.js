const { Player } = require("discord-player");
module.exports = (client,interaction) =>
{
    if (!interaction.isCommand() || !interaction.guildId) return;

	if (!client.commands.has(interaction.commandName)) return;

	const cmd = client.commands.get(interaction.commandName)

    if(cmd) cmd.execute(client, interaction, Player);
}