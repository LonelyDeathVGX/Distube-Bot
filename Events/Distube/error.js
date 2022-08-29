const client = require("../../bot.js");

client.distube.on("error", async (queue) => {
	queue.textChannel.send({
		content: "Se ha producido un error, por favor, contacta con el desarrollador (**Lonely#3327**). 🤔"
	});
});