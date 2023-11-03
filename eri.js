const { Client, Collection, Intents , GatewayIntentBits} = require("discord.js");
const distube = require("distube")
const fs = require('fs');
const {Connectors} = require("shoukaku");
const  {Kazagumo} = require("kazagumo");
const client = new Client({ intents: [ GatewayIntentBits.Guilds ,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildVoiceStates] });
client.config = require("./bot/config")
client.commands = new Collection();
client.colour = 0x17BEBB;
// Host : lavalink.jirayu.pw
// Port : 2333
// Password : "jirayu.pw"
// Secure : false
const Nodes = [ {
    name: "lavaplayer",
    url: "lava1.horizxon.tech",
    port: 443,
    auth: "horizxon.tech",
    secure: true,
}]

client.player =  new Kazagumo({
    defaultSearchEngine: "youtube_music",
    // MAKE SURE YOU HAVE THIS
    send: (guildId, payload) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
    }
}, new Connectors.DiscordJS(client), Nodes);

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
    console.log(`Loading Distube event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
}

client.login(client.config.discord.token)
require("./reload")
