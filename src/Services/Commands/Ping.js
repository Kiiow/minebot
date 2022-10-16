const { SlashCommandBuilder } = require("discord.js")

async function ping(interaction) {
    await interaction.reply("Pong!")
}

module.exports = {
    "slashBuilder" : new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong"),
    "action": ping
}