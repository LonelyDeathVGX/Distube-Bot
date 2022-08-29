const { ApplicationCommandType } = require("discord.js");
const config = require("../../Config/config.json");

module.exports = {
    name: "now-playing",
    description: "Muestra la canción que se está reproduciendo.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args, language) => {
        const queue = client.distube.getQueue(interaction);

        if (!queue) {
            return interaction.followUp({
                content: "**La música no está activa en este servidor.**\nIntenta escribir `n!play <canción o url>` para comenzar la fiesta. 👍"
            });
        }

        const song = queue.songs[0]

        interaction.followUp({
            content: "Ahora estoy reproduciendo `" + song.name + "`. 🎶"
        });
    }
};