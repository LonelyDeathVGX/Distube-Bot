const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "pause",
    voiceChannel: true,
    run: async (client, message, args, language) => {
        const oldConnection = getVoiceConnection(message.guild.id);

        if (oldConnection && oldConnection.joinConfig.channelId != message.member.voice.channelId) {
            return message.reply({
                content: "No estás en el **mismo canal de voz**. 🤔"
            });
        }

        const queue = client.distube.getQueue(message);

        if (!queue) {
            return message.reply({
                content: "**La música no está activa en este servidor.**\nIntenta escribir `n!play <canción o url>` para comenzar la fiesta. 👍"
            });
        }

        if (!queue.paused) {
            queue.pause();

            message.reply({
                content: "La canción fue pausada. 👌"
            });
        } else {
            return message.reply({
                content: "**La canción ya estaba pausada.**\nIntenta escribir `n!resume` para reanudarla. 👍"
            });
        }
    }
};