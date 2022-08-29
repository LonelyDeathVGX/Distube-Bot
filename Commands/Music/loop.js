const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "loop",
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

        const mode = client.distube.setRepeatMode(message);

        message.reply({
            content: `El bucle fue establecido a **${mode ? mode === 2 ? 'toda la cola' : 'esta canción' : 'desactivado'}**. 👌`
        });
    }
};