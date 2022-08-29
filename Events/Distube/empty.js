const client = require("../../bot.js");

client.distube.on("empty", async (queue) => {
    queue.textChannel.send({
        content: "Dejando el canal de voz por inactividad. 👍"
    });
});