module.exports = {
	name: "ping",
	run: async (client, message, args, language) => {
		message.reply({
			content: "¡Pong! `" + client.ws.ping + "ms`. 🏓"
		});
	}
};