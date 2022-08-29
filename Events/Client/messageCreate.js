const client = require("../../bot.js");

client.on("messageCreate", async (message) => {
    const prefix = "n!";

    if (message.author.bot) return;

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.get(cmd.toLowerCase());

    if (command) {
        if (command.voiceChannel && !message.member.voice.channel) {
            return message.reply({
                content: "Primero tienes que estar en un **canal de voz**. 🤔"
            });
        }

        command.run(client, message, args);
    }
});