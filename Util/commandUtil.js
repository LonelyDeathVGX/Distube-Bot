const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client) => {
    const commandFiles = await globPromise(`${process.cwd()}/Commands/*/*.js`);

    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };

            client.commands.set(file.name, properties);
        }
    });

    const eventFiles = await globPromise(`${process.cwd()}/Events/*/*.js`);

    eventFiles.map((value) => require(value));

    const slashCommandFiles = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
    const commands = [];

    slashCommandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (!file.name) return;

        const properties = { directory, ...file };

        client.slashcommands.set(file.name, properties);

        if (["MESSAGE", "USER"].includes(file.type)) {
            delete file.description;
        }

        commands.push(file);
    });

    client.on("ready", async () => {
        await client.application.commands.set(commands);
    });
};