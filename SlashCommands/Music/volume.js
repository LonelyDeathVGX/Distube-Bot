const {
    ApplicationCommandType,
    ApplicationCommandOptionType
} = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "volume",
    description: "Establece el volumen de la canción.",
    voiceChannel: true,
    options: [
        {
            name: "volume",
            description: "-",
            type: ApplicationCommandOptionType.Integer,
            maxValue: 100,
            minValue: 0,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args, language) => {
        const volume = interaction.options.getInteger("volume");

        const oldConnection = getVoiceConnection(interaction.guild.id);

        if (oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) {
            return interaction.followUp({
                content: "No estás en el **mismo canal de voz**. 🤔"
            });
        }

        const queue = client.distube.getQueue(interaction);

        if (!queue) {
            return interaction.followUp({
                content: "**La música no está activa en este servidor.**\nIntenta escribir `n!play <canción o url>` para comenzar la fiesta. 👍"
            });
        }

        queue.setVolume(volume);

        interaction.followUp({
            content: "El volumen fue establecido a `" + volume + "%`. 👌"
        });
    }
};