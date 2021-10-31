const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: 'uptime',
    category: 'info',
    utilisation: '/uptime',

    async execute(client, interaction) {
        interaction.reply({embeds: [{
     color: client.color,
     description: `__Uptime:__\n\n${moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}`
   }]} )
    }
}