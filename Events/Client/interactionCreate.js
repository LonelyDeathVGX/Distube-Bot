const client = require("../../bot.js");
const { ApplicationCommandOptionType } = require("discord.js");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply().catch(() => { });

        const command = client.slashcommands.get(interaction.commandName);
        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === ApplicationCommandOptionType.Subcommand) {
                if (option.name) {
                    args.push(option.name);
                }

                option.options.forEach((x) => {
                    if (x.value) {
                        args.push(x.value);
                    }
                });
            } else if (option.value) {
                args.push(option.value);
            }
        }

        if (command) {
            if (command.voiceChannel && !interaction.member.voice.channel) {
                return interaction.followUp({
                    content: "Primero tienes que estar en un **canal de voz**. 🤔"
                });
            }

            command.run(client, interaction, args);
        }
    }
});