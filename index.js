const { Client, GatewayIntentBits } = require("discord.js");

const { commands } = require("./src/Services/Commands");
const { refreshSlashCommands, removeAllSlashCommands } = require("./src/Services/SlashCommands");
const { CommandManager } = require("./src/Services/CommandManager");
const { loadConfig } = require("./src/Services/Config");

loadConfig();
const client = new Client({ "intents" : [ GatewayIntentBits.Guilds ] });
refreshSlashCommands(commands);


client.on('ready', () => {
    console.log(`Client logged in as ${client.user?.tag}`);
});

let interactionManager = new CommandManager(commands);
client.on("interactionCreate", async interaction => {
    if(!interaction.isChatInputCommand()) return;
    
    interactionManager.parseInterraction(interaction);
});

client.login(process.env.DISCORDBOT_TOKEN);

process.on('SIGINT', () => {
  console.log(`Stopping bot manually (CTRL + C)`);
  process.exit(2);
});


process.on('exit', () => {
  removeAllSlashCommands();
  console.log(`${client.user?.tag} disconnecting...`);
  client.destroy();
})
