module.exports = async (client,queue,track) => {
    let array = client.config.discord.ne
    function remove(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }
    const x = array.find(m => m.guild == queue.metadata.guild)
    await x.delete()
    client.config.discord.ne =  remove(array,x)
}