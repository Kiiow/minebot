const { SlashCommandBuilder } = require("discord.js");
const { GithhubHandler } = require("./GithubHandler");

async function github(interaction) {
    let githubManager = new GithhubHandler(interaction);
    switch(interaction.options._subcommand) {
        case "releases":
            githubManager.releases();
            break;
        case "repos_o":
            githubManager.repos("orgs");
            break;
        case "repos_u":
            githubManager.repos("users");
            break;
        default:
            interaction.reply("Nah I don't know this one. Please retry");
            break;
    }
}

module.exports = {
    "slashBuilder":
    new SlashCommandBuilder()
        .setName("github")
        .setDescription("Interact with github repositories")
        .addSubcommand( sc =>
            sc
                .setName("releases")
                .setDescription("Get every releases from the repository of an organization (Do not work with users repositories)")
                .addStringOption( o =>
                    o
                        .setName("org")
                        .setDescription("Name of the organization")
                        .setRequired(true)
                )
                .addStringOption( o =>
                    o
                        .setName("repos")
                        .setDescription("Name of the repository")
                        .setRequired(true)    
                )
        )
        .addSubcommand( sc =>
            sc
                .setName("repos_o")
                .setDescription("Retrieve the repositories of an organization")
                .addStringOption( o =>
                    o
                        .setName("org")
                        .setDescription("Name of the organization")
                        .setRequired(true)    
                )
        )
        .addSubcommand( sc =>
            sc
                .setName("repos_u")
                .setDescription("Retrieve the repositories of a user")
                .addStringOption( o =>
                    o
                        .setName("user")
                        .setDescription("Name of the user")
                        .setRequired(true)    
                )    
        )
    ,
    "action": github
}

