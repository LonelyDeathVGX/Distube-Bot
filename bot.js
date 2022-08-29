const {
	Client,
	GatewayIntentBits,
	Partials,
	Collection
} = require("discord.js");
const client = new Client({
	shards: "auto",
	restTimeOffSet: 0,
	allowedMentions: {
		repliedUser: false
	},
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User
	]
});

const { DisTube } = require("distube");
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const express = require("express");
const app = express();

require("dotenv").config();
require("./Util/commandUtil.js")(client);

client.login(process.env.Token);

client.commands = new Collection();
client.slashcommands = new Collection();
client.queues = new Collection();
client.language = {};
client.distube = new DisTube(client, {
	leaveOnStop: false,
	emitNewSongOnly: true,
	leaveOnFinish: true,
	leaveOnEmpty: true,
	emptyCooldown: 30,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin()
	]
});

app.get("/", (req, res) => {
	res.send("Ready");
});

app.listen(process.env.PORT);

module.exports = client;