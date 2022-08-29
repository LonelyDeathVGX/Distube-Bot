const { ApplicationCommandType } = require("discord.js");
const config = require("../../Config/config.json");

module.exports = {
    name: "queue",
    description: "Muestra la cola de canciones.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args, language) => {
        const queue = client.distube.getQueue(interaction);

        if (!queue) {
            return interaction.followUp({
                content: "**La música no está activa en este servidor.**\nIntenta escribir `n!play <canción o url>` para comenzar la fiesta. 👍"
            });
        }

        var map = queue.songs.slice(1).slice(0, 15).map((song) => {
            return "▫️ `" + song.name + "` - [" + song.formattedDuration + "].";
        }).join("\n");

        if (!map) {
            map = "**No hay más canciones en la cola.**\nIntenta escribir `n!play <canción o url>` para agregar más canciones. 👍";
        }

        const song = queue.songs[0];

        const embed = {
            thumbnail: {
                url: client.user.avatarURL({
                    dynamic: true
                })
            },
            author: {
                name: client.user.tag,
                iconURL: client.user.avatarURL({
                    dynamic: true
                })
            },
            fields: [
                {
                    name: "Ahora reproduciendo:",
                    value: "▫️ `" + song.name + "` - [" + song.formattedDuration + "]."
                },
                {
                    name: "Cola (" + queue.songs.length + " canciones):",
                    value: map
                }
            ],
            image: {
                url: song.thumbnail
            },
            color: 0x000000,
            timestamp: new Date()
        };

        interaction.followUp({
            embeds: [embed]
        });
    }
};