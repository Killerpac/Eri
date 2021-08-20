const { Client, Collection, Intents} = require("discord.js");
const distube = require("distube")
const fs = require('fs');
const { SpotifyPlugin } = require("@distube/spotify");
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILDS] });
client.config = require("./bot/config")
client.commands = new Collection();
client.colour = "#f542bf"
client.player = new distube.DisTube(client,{
    emitAddSongWhenCreatingQueue:false,
    youtubeCookie:client.config.discord.cookie,
    plugins:[new SpotifyPlugin({
        emitEventsAfterFetching: true
    })]
});

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
