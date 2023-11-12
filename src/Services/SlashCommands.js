const { REST, Routes } = require("discord.js");

async function registerCommands(commands) {
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

async function removeCommands() {
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

async function cleanExitDiscord(client) {
    if(process.env.ENVIRONMENT?.toUpperCase() === "PROD") {
        await removeCommands();
    }
    console.log(`${client.user?.tag} disconnecting...`);
    client.destroy();
}

function disconnectHandler(client) {
    process.on("SIGTERM", async () => {
        console.log(`Stopping process`);
        await cleanExitDiscord(client);
    });
    process.on("SIGINT", async () => {
        console.log(`Stopping bot manually (CTRL + C)`);
        await cleanExitDiscord(client);
    });
}

module.exports = {
    registerCommands,
    removeCommands,
    disconnectHandler
};