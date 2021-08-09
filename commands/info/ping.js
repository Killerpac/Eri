module.exports = {
    name: 'ping',
    category: 'Music',
    utilisation: '/ping',

    async execute(client, interaction) {
        interaction.reply({ content: 'Pong! '+client.ws.ping+" ms", ephemeral: true })
    }
}