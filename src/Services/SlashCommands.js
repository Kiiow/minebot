const { REST, Routes } = require("discord.js");

async function refreshSlashCommands(commands) {
    const rest = new REST({ version : '10' }).setToken(process.env.DISCORDBOT_TOKEN);
    console.log(`Start refreshing application (/) commands.`);
    await rest.put(Routes.applicationCommands(process.env.DISCORDBOT_CLIENT_ID), { "body": commands })
        .then((data) => {
            console.log(`Successfully Added ${data.length} commands`)
        })
        .catch((error) => {
            console.error(`Error while adding (/) commands ${error}`)
        });
}

async function removeAllSlashCommands() {
    const rest = new REST({ version : '10' }).setToken(process.env.DISCORDBOT_TOKEN);
    console.log(`Removing every (/) commands`);
    await rest.put(Routes.applicationCommands(process.env.DISCORDBOT_CLIENT_ID), { "body": [] })
        .then((data) => {
            console.log(`Successfully deleted all application commands`)
        })
        .catch((error) => {
            console.error(`Error while deleteing every (/) commands ${error}`)
        });
}

module.exports = {
    refreshSlashCommands,
    removeAllSlashCommands
};