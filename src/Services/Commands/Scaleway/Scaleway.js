const { SlashCommandBuilder } = require("discord.js");
const { ScalewayHandler } = require("./ScalewayHandler");

async function scaleway(interaction) {
    let scaManager = new ScalewayHandler(interaction);
    switch(interaction.options._subcommand) {
        case "list":
            scaManager.list();
            break;
        case "status":
            scaManager.status();
            break;
        case "start":
            scaManager.start();
            break;
        case "stop":
            scaManager.stop();
            break;
        default:
            interaction.reply("Mmh didn't get this one. Please retry");
    }
}

module.exports = {
    "slashBuilder" :
    new SlashCommandBuilder()
        .setName("scaleway")
        .setDescription("Interact with scaleway servers")
        .addSubcommand(sc => 
            sc
                .setName("list")
                .setDescription("List servers")
        )
        .addSubcommand( sc =>
            sc
                .setName("status")
                .setDescription("Check the status off a server")
                .addStringOption( o =>
                    o
                        .setName("server_id")
                        .setDescription("The server id")
                        .setRequired(true)
                )
        )
        .addSubcommand( sc =>
            sc
                .setName("start")
                .setDescription("Start a server")
                .addStringOption( o =>
                    o
                        .setName("server_id")
                        .setDescription("The server id")
                        .setRequired(true)
                )
        )
        .addSubcommand( sc =>
            sc
                .setName("stop")
                .setDescription("Stop a server")
                .addStringOption( o =>
                    o
                        .setName("server_id")
                        .setDescription("The server id")
                        .setRequired(true)
                )
        )
    ,
    "action": scaleway
}