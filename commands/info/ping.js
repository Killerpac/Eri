module.exports = {
    name: 'ping',
    category: 'info',
    utilisation: '/ping',

    async execute(client, interaction) {
        interaction.reply({ content: 'Pong! '+client.ws.ping+" ms", ephemeral: true })
    }
}