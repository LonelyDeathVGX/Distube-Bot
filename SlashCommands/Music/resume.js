const { ApplicationCommandType } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "resume",
    description: "Reanuda la canción.",
    voiceChannel: true,
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args, language) => {
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

        if (queue.paused) {
            queue.resume();

            interaction.followUp({
                content: "La canción fue reanudada. 👌"
            });
        } else {
            return interaction.followUp({
                content: "**La canción ya estaba reanudada.**\nIntenta escribir `n!pause` para pausarla. 👍"
            });
        }
    }
};