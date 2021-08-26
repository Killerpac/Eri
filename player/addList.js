module.exports = (client, queue, playlist) => {
    queue.textChannel.send({embeds:[{description:`🎶 | Added [${playlist.name}](${playlist.url}) in **${queue.VoiceChannel.name}** (${playlist.songs.length} songs)`,color:`${client.colour}`}]});
}