module.exports = { 
    commands:[
    {
        name:"ping",
        description: "Shows The Ping of the bot"
    },
    {
        name: "play",
        description: "Plays a song",
        options: [
            {
                name: "query",
                type: 3,
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
                type: 4,
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
                type: 4,
                description: "Loop type",
                required: true,
                choices: [
                    {
                        name: "Off",
                        value: 0
                    },
                    {
                        name: "Track",
                        value: 1
                    },
                    {
                        name: "Queue",
                        value: 2
                    }
                ]
            }
        ]
    },
    {
        name: "shuffle",
        description: "Shuffles The Queue"
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
      name: "uptime",
      description: "Shows The Bot Uptime"
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
    {
        name: "bassboost",
        description: "Toggles bassboost filter"
    },
    {
        name: "autoplay",
        description: "Toggles Autoplay"
    },
    {
        name: "skipto",
        description: "Skip to the selected song",
        options: [
            {
                name: "index",
                type: 4,
                description: "index of song in queue",
                required: true
            }
        ]
    },
] };