const { Client, Collection} = require("discord.js");
const { Player, QueryType, QueueRepeatMode } = require("discord-player");
const fs = require('fs');
const client = new Client({
    intents: ["GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILDS"]
});
client.config = require("./bot/config")
client.commands = new Collection();
client.player = new Player(client);
client.QueryType = QueryType
client.QueueRepeatMode = QueueRepeatMode
client.colour = "#f542bf"

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
}

client.login(client.config.discord.token)
require("./reload")
