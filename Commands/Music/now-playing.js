const config = require("../../Config/config.json");

module.exports = {
    name: "now-playing",
    run: async (client, message, args, language) => {
        const queue = client.distube.getQueue(message);

        if (!queue) {
            return message.reply({
                content: "**La música no está activa en este servidor.**\nIntenta escribir `n!play <canción o url>` para comenzar la fiesta. 👍"
            });
        }

        const song = queue.songs[0]

        message.reply({
            content: "Ahora estoy reproduciendo `" + song.name + "`. 🎶"
        });
    }
};