const { SlashCommandBuilder } = require("discord.js");

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
                .addUserOption( o =>
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
                .addUserOption( o =>
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
                .addUserOption( o =>
                    o
                        .setName("server_id")
                        .setDescription("The server id")
                        .setRequired(true)
                )
        )
    ,
    "action": (s) => { s.reply("yes"); }
}