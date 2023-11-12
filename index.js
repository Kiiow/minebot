const { loadConfig } = require("./src/Config.js");
loadConfig();

const { Client, GatewayIntentBits } = require("discord.js");

const { commands } = require("./src/Services/Commands.js");
const { registerCommands, disconnectHandler } = require("./src/Services/SlashCommands.js");
const { CommandManager } = require("./src/Services/CommandManager");

const client = new Client({ "intents" : [ GatewayIntentBits.Guilds ] });
registerCommands(commands);

client.on("ready", () => {
  console.log(`Client logged in as ${client.user?.tag}`);
});

let interactionManager = new CommandManager(commands);
client.on("interactionCreate", async interaction => {
  if(!interaction.isChatInputCommand()) return;
  
  interactionManager.parseInterraction(interaction);
});

client.login(process.env.DISCORDBOT_TOKEN);
disconnectHandler(client);