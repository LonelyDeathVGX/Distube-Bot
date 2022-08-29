const client = require("../../bot.js");

client.distube.on("addSong", async (queue, song) => {
    queue.textChannel.send({
        content: "La canción `" + song.name + "` fue añadida a la cola. 👌"
    });
});