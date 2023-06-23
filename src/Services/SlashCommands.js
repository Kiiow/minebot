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

async function exit(client) {
    await removeCommands();
    console.log(`${client.user?.tag} disconnecting...`);
    client.destroy();
    process.exit();
}

function disconnectHandler(client) {
    process.on('SIGINT', () => {
        console.log(`Stopping bot manually (CTRL + C)`);
        exit(client);
    });

    process.on('exit', () => {
        exit(client);
    })
}

module.exports = {
    registerCommands,
    removeCommands,
    disconnectHandler
};