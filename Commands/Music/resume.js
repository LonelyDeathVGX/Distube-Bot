const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "resume",
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

        if (queue.paused) {
            queue.resume();

            message.reply({
                content: "La canción fue reanudada. 👌"
            });
        } else {
            return message.reply({
                content: "**La canción ya estaba reanudada.**\nIntenta escribir `n!pause` para pausarla. 👍"
            });
        }
    }
};