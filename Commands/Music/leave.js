const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "leave",
    voiceChannel: true,
    run: async (client, message, args, language) => {
        const oldConnection = getVoiceConnection(message.guild.id);

        if (oldConnection && oldConnection.joinConfig.channelId != message.member.voice.channelId) {
            return message.reply({
                content: "No estás en el **mismo canal de voz**. 🤔"
            });
        }

        const connection = client.distube.voices.get(message);

        if (!connection) {
            return message.reply({
                content: "No estoy conectado a **ningún canal de voz**. 🤔"
            });
        }

        client.distube.voices.leave(message);

        message.reply({
            content: "He dejado el canal de voz. 👍"
        });
    }
};