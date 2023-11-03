module.exports = (client, player) => {
    client.channels.cache.get(player.textId).send({embeds:[{description:`❌ | error in resolvinf the playtlist ...`,color:`${client.colour}`}]});
}