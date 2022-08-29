const client = require("../../bot.js");

process.on("uncaughtException", (err, origin) => {
    console.log(err, origin);

    const embed = {
        author: {
            name: client.user.tag,
            iconURL: client.user.avatarURL({
                dynamic: true
            })
        },
        description: "```" + err.stack ? err.stack : err + "```",
        color: 0x000000,
        timestamp: new Date()
    };

    client.users.cache.get("945029734943821824").send({
        embeds: [embed]
    });
});