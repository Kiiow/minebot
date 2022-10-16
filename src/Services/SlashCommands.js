const { REST, Routes } = require("discord.js");

async function refreshSlashCommands(commands) {
    const rest = new REST({ version : '10' }).setToken(process.env.DISCORDBOT_TOKEN);
    try {
        console.log(`Start refreshing application (/) commands.`);
        await rest.put(Routes.applicationCommands(process.env.DISCORDBOT_CLIENT_ID), { "body": commands });
    } catch(error) {
        console.error(`oupsi ${error}`);
    }
}

module.exports = {
    refreshSlashCommands
};