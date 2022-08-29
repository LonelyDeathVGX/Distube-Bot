const client = require("../../bot.js");

client.distube.on("playSong", async (queue, song) => {
    queue.textChannel.send({
        content: "Ahora reproduciendo: `" + song.name + "`. 🎶"
    });
});