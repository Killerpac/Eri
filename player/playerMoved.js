module.exports = (client, player) => {
    client.channels.cache.get(player.textId).send({embeds:[{description:`❌ | Player Is Moved...`,color:`${client.colour}`}]});
}