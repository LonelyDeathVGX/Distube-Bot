const client = require("../../bot.js");

client.distube.on("finish", async (queue) => {
    queue.textChannel.send({
        content: "La cola fue finalizada. 👍"
    });
});