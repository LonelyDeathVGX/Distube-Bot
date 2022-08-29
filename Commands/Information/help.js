const {
	ActionRowBuilder,
	SelectMenuBuilder
} = require("discord.js");
const config = require("../../Config/config.json");

module.exports = {
	name: "help",
	run: async (client, message, args, language) => {
		const directories = [
			...new Set(client.commands.map((cmd) => cmd.directory))
		];

		const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

		const categories = directories.map((dir) => {
			const getCommands = client.commands.filter((cmd) => cmd.directory === dir).map((cmd) => {
				return {
					name: cmd.name || "No command."
				};
			});

			return {
				directory: formatString(dir),
				commands: getCommands
			};
		});

		const row = (state) => [
			new ActionRowBuilder()
				.addComponents(
					new SelectMenuBuilder()
						.setCustomId("help-menu")
						.setDisabled(state)
						.addOptions([
							{
								label: "Información.",
								value: "information",
								emoji: "▫️"
							},
							{
								label: "Música.",
								value: "music",
								emoji: "▫️"
							}
						])
				)
		];

		const msg = await message.reply({
			content: "Selecciona una categoría. 👍",
			components: row(false)
		});

		const collector = msg.createMessageComponentCollector({
			filter: (i) => i.user.id === message.author.id,
			time: 60000
		});

		collector.on("collect", (i) => {
			const [directory] = i.values;
			const category = categories.find((x) => x.directory.toLowerCase() === directory);

			const map = category.commands.map((cmd) => {
				return "`" + cmd.name + "`";
			}).join(", ");

			const embed = {
				thumbnail: {
					url: client.user.avatarURL({
						dynamic: true
					})
				},
				author: {
					name: client.user.tag,
					iconURL: client.user.avatarURL({
						dynamic: true
					})
				},
				fields: [
					{
						name: "Comandos:",
						value: "▫️ " + map + "."
					}
				],
				color: 0x000000,
				timestamp: new Date()
			};

			i.update({
				content: "",
				embeds: [embed]
			});
		});

		collector.on("end", () => {
			msg.edit({
				components: row(true)
			});
		});
	}
};