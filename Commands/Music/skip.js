const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "skip",
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

        try {
            await queue.skip();

            message.reply({
                content: "La canción fue saltada. 👌"
            });
        } catch (err) {
            console.error(err);

            return message.reply({
                content: "La cola no tiene más canciones. 🤔"
            });
        }
    }
};