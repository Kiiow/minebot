require("./src/Config.js")();

const { Client, GatewayIntentBits } = require("discord.js");

const { commands } = require("./src/Services/Commands");
const { refreshSlashCommands } = require("./src/Services/SlashCommands");
const { CommandManager } = require("./src/Services/CommandManager");

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
require("./src/Services/ExitRegister")(client);