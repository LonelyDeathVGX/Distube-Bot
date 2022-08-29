const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "play",
    voiceChannel: true,
    run: async (client, message, args, language) => {
        const oldConnection = getVoiceConnection(message.guild.id);

        if (oldConnection && oldConnection.joinConfig.channelId != message.member.voice.channelId) {
            return message.reply({
                content: "No estás en el **mismo canal de voz**. 🤔"
            });
        }

        if (!message.member.voice.channel.permissionsFor(message.guild.members.me).has("Connect") || !message.member.voice.channel.permissionsFor(message.guild.members.me).has("Speak")) {
            return message.reply({
                content: "No tengo permisos en el canal, necesito **Conectar** y **Hablar**. 🤔"
            });
        }

        const search = args.join(" ");

        if (!search) {
            return message.reply({
                content: "**No hay un reproductor de música en este servidor.**\nIntenta escribir `n!play <canción o url>` para comenzar. 👍"
            });
        }

		await client.distube.voices.join(message.member.voice.channel);

        message.reply({
            content: "Cargando.. (Esto puede tardar unos segundos). 👍"
        });

        await client.distube.play(message.member.voice.channel, search, {
            message,
            textChannel: message.channel,
            member: message.member,
            queue: message.guild.id
        });
    }
};