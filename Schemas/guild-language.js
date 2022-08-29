const { Schema, model } = require("mongoose");

const schema = new Schema({
    GuildID: {
        type: String
    },
    Language: {
        type: String
    }
});

module.exports = model("guild-language", schema);