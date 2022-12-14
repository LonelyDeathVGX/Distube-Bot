require("dotenv").config();

const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
    token: process.env.Token
});

manager.on("shardCreate", (shard) => {
    console.log("Shard " + shard.id + " was created.");
});

manager.spawn();