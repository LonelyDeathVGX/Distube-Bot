const client = require("../../bot.js");

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);

    const embed = {
        author: {
            name: client.user.tag,
            iconURL: client.user.avatarURL({
                dynamic: true
            })
        },
        description: "```" + reason.stack ? String(reason.stack) : String(reason) + "```",
        color: 0x000000,
        timestamp: new Date()
    };

    client.users.cache.get("945029734943821824").send({
        embeds: [embed]
    });
});