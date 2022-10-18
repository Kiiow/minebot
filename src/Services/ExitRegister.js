const { removeAllSlashCommands } = require("./SlashCommands");

module.exports = ((client) => {
    process.on('SIGINT', () => {
        console.log(`Stopping bot manually (CTRL + C)`);
        exit(client);
    });

    process.on('exit', () => {
        exit(client);
    })
})
async function exit(client) {
    await removeAllSlashCommands();
    console.log(`${client.user?.tag} disconnecting...`);
    client.destroy();
    process.exit();
}