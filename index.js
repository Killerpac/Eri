const { Client, GuildMember } = require("discord.js");
const {  default: DisTube } = require("distube");

const client = new Client({
    intents: ["GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILDS"]
});
const ppap = require("./config")
client.on("error", console.error);
client.on("warn", console.warn);

// instantiate the player
const player = new DisTube(client,{
    youtubeDL:false,
    ytdlOptions: {
        quality: 'highestaudio',
        requestOptions: {
         headers: {
              cookie: ppap.client.cookie
               }
            }
    },
})
 
player.on("error", (queue, error) => {
    queue.send(`❌ | [${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});

player.on("playSong", (queue, song) => {
    queue.textChannel.send(`🎶 | Playing: **${song.name}** in **${queue.voiceChannel.name}**!`);
});

player.on("addList", (queue, playlist) => {
    queue.textChannel.send(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`);
});

player.on("addSong", (queue, song) => {
    queue.textChannel.send(`🎶 | **${song.name}** queued!`);
});

player.on("disconnect", (queue) => {
    queue.textChannel.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
});

player.on("empty", (queue) => {
    queue.textChannel.send("❌ | Nobody is in the voice channel, leaving...");
});

player.on("finish", (queue) => {
    queue.textChannel.send("✅ | End Of Queue");
});

client.on("ready", async () => {
    console.log("Bot is online!");
   await client.user.setActivity({
        name: "🎶 | Music Time",
        type: "LISTENING"
    });
        await client.application.commands.set([
            {
                name: "play",
                description: "Plays a song from youtube",
                options: [
                    {
                        name: "query",
                        type: "STRING",
                        description: "The song you want to play",
                        required: true
                    }
                ]
            },
            {
                name: "volume",
                description: "Sets music volume",
                options: [
                    {
                        name: "amount",
                        type: "INTEGER",
                        description: "The volume amount to set (0-100)",
                        required: false
                    }
                ]
            },
            {
                name: "loop",
                description: "Sets loop mode",
                options: [
                    {
                        name: "mode",
                        type: "INTEGER",
                        description: "Loop type",
                        required: true,
                        choices: [
                            {
                                name: "Off",
                                value: 0
                            },
                            {
                                name: "Current Song",
                                value: 1
                            },
                            {
                                name: "Queue Loop",
                                value: 2
                            }
                        ]
                    }
                ]
            },
            {
                name: "skip",
                description: "Skip to the current song"
            },
            {
                name: "queue",
                description: "See the queue"
            },
            {
                name: "pause",
                description: "Pause the current song"
            },
            {
                name: "resume",
                description: "Resume the current song"
            },
            {
                name: "stop",
                description: "Stop the player"
            },
            {
                name: "np",
                description: "Now Playing"
            },
        ]);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;

    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
        return void interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
    }

    if (interaction.commandName === "play") {
        interaction.defer();
        const query = interaction.options.get("query").value;
        if(!query) return void interaction.reply({ content: "You need to specify a song to play!", ephemeral: true });
        if(query.toLowerCase().includes('spotify')) return void interaction.followUp("Spotify is not Suported for now");
        await player.playVoiceChannel(interaction.member.voice.channel, `${query}`,{textChannel: interaction.channel});
        await interaction.followUp({ content: `⏱ | Loading ...` });
    } else if (interaction.commandName === "volume") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const vol = interaction.options.get("amount");
        if (!vol) return void interaction.followUp({ content: `🎧 | Current volume is **${queue.volume}**%!` });
        if ((vol.value) < 0 || (vol.value) > 100) return void interaction.followUp({ content: "❌ | Volume range must be 0-100" });
        const success = queue.setVolume(vol.value);
        return void interaction.followUp({
            content: success ? `✅ | Volume set to **${vol.value}%**!` : "❌ | Something went wrong!"
        });
    } else if (interaction.commandName === "skip") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const currentsong = queue.songs[0]
        const success = queue.skip();
        return void interaction.followUp({
            content: success ? `✅ | Skipped **${currentsong.name}**!` : "❌ | Something went wrong!"
        });
    } else if (interaction.commandName === "queue") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const currentsong = queue.songs[0];
        const songs = queue.songs.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.name}**`;
        });

        return void interaction.followUp({
            embeds: [
                {
                    title: "Server Queue",
                    description: `${songs.join("\n")}${
                        queue.songs.length > songs.length
                            ? `\n...${queue.songs.length - songs.length === 1 ? `${queue.songs.length - songs.length} more song` : `${queue.songs.length - songs.length} more songs`}`
                            : ""
                    }`,
                    color: 0xff0000,
                    fields: [{ name: "Now Playing", value: `🎶 | **${currentsong.name}**` }]
                }
            ]
        });
    } else if (interaction.commandName === "pause") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const success = queue.pause();
        return void interaction.followUp({ content: success ? "⏸ | Paused!" : "❌ | Something went wrong!" });
    } else if (interaction.commandName === "resume") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const success = queue.resume();
        return void interaction.followUp({ content: success ? "▶ | Resumed!" : "❌ | Something went wrong!" });
    } else if (interaction.commandName === "stop") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        queue.stop();
        return void interaction.followUp({ content: "🛑 | Stopped the player!" });
    } else if (interaction.commandName === "np") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });

        return void interaction.followUp({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.songs[0].name}**! (\`${queue.formattedCurrentTime}%\`)`,
                    color: 0xff6869
                }
            ]
        });
    } else if (interaction.commandName === "loop") {
        await interaction.defer();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const loopMode = interaction.options.get("mode").value;
        let mode = queue.setRepeatMode(loopMode);
        mode = mode ? mode == 2 ? "🔁" : "🔂" : "Off";
        return void interaction.followUp({ content: mode ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
    } else {
        interaction.reply({
            content: "Unknown command!",
            ephemeral: true
        });
    }
});

client.login(ppap.client.token);
