const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "volume",
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

        const noNumber = args[0];

        if (!noNumber) {
            return message.reply({
                content: "Tienes que poner un **número**. 🤔"
            });
        }

        const volume = parseInt(noNumber);

        if (isNaN(volume)) {
            return message.reply({
                content: "Tienes que poner un **número**. 🤔"
            });
        }

        if (volume < 0 || volume > 100) {
            return message.reply({
                content: "El volumen no puede ser menor de **0** y mayor de **100** 🤔"
            });
        }

        queue.setVolume(volume);

        message.reply({
            content: "El volumen fue establecido a `" + volume + "%`. 👌"
        });
    }
};