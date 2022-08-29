const { ApplicationCommandType } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "leave",
    description: "Deja el canal de voz.",
    voiceChannel: true,
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args, language) => {
        const oldConnection = getVoiceConnection(interaction.guild.id);

        if (oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) {
            return interaction.followUp({
                content: "No estás en el **mismo canal de voz**. 🤔"
            });
        }

        const connection = client.distube.voices.get(interaction);

        if (!connection) {
            return interaction.followUp({
                content: "No estoy conectado a **ningún canal de voz**. 🤔"
            });
        }

        client.distube.voices.leave(interaction);

        interaction.followUp({
            content: "He dejado el canal de voz. 👍"
        });
    }
};