const {
    ApplicationCommandType,
    ApplicationCommandOptionType
} = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "play",
    description: "Reproduce una canción.",
    voiceChannel: true,
    options: [
        {
            name: "search",
            description: "-",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args, language) => {
        const search = interaction.options.getString("search");

        const oldConnection = getVoiceConnection(interaction.guild.id);

        if (oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) {
            return interaction.followUp({
                content: "No estás en el **mismo canal de voz**. 🤔"
            });
        }

        if (!interaction.member.voice.channel.permissionsFor(interaction.guild.members.me).has("Connect") || !interaction.member.voice.channel.permissionsFor(interaction.guild.members.me).has("Speak")) {
            return interaction.followUp({
                content: "No tengo permisos en el canal, necesito **Conectar** y **Hablar**. 🤔"
            });
        }

		await client.distube.voices.join(interaction.member.voice.channel);

        interaction.followUp({
            content: "Cargando.. (Esto puede tardar unos segundos). 👍"
        });

        await client.distube.play(interaction.member.voice.channel, search, {
            interaction,
            textChannel: interaction.channel,
            member: interaction.member,
            queue: interaction.guild.id
        });
    }
};