const { SlashCommandBuilder } = require("discord.js");

function ping(interaction) {
    interaction.reply("Pong!")
}

module.exports = {
    "slashBuilder" : new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong"),
    "action": ping
}