const client = require("../../bot.js");

client.distube.on("addList", async (queue, playlist) => {
    queue.textChannel.send({
        content: "La playlist `" + playlist.name + "` fue añadida a la cola.\nAñadido **" + playlist.songs.length + " canciones** a la cola. 👌"
    });
});