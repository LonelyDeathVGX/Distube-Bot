const client = require("../../bot.js");
const { ActivityType } = require("discord.js");
const config = require("../../Config/config.json");
const { default: mongoose } = require("mongoose");

client.on("ready", async () => {
    client.user.setPresence({
        activities: [
            {
                name: "n!help",
                type: ActivityType.Watching
            }
        ],
        status: "online"
    });

    console.log("User " + client.user.username + " connected.");

    await mongoose.connect(process.env.MongoDB).then(() => {
        console.log("Database connected.");
    });
});