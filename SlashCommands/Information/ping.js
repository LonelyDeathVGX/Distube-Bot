const { ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Muestra la latencia del bot.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction, args, language) => {
        interaction.followUp({
            content: "¡Pong! `" + client.ws.ping + "ms`. 🏓"
        });
    }
};