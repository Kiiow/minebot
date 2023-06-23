const { SlashCommandBuilder } = require("discord.js");
const { GithhubHandler } = require("./GithubHandler");


async function github(interaction) {
    let githubManager = new GithhubHandler(interaction);
    switch(interaction.options._subcommand) {
        case "releases":
            githubManager.releases();
            break;
        case "repos":
            githubManager.repos();
            break;
        case "profile":
            githubManager.profile();
            break;
        default:
            interaction.reply("Nah I don't know this one. Please retry");
        return;
    }
}

module.exports = {
    "slashBuilder":
    new SlashCommandBuilder()
        .setName("git")
        .setDescription("Interact with github repositories")
        .addSubcommand( sc =>
            sc
                .setName("releases")
                .setDescription("Get releases from a repository")
                .addStringOption( o =>
                    o
                        .setName("user")
                        .setDescription("Name of the user")
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
                .setName("repos")
                .setDescription("Retrieve repositories of a user")
                .addStringOption( o =>
                    o
                        .setName("user")
                        .setDescription("Name of the user")
                        .setRequired(true)
                )
        )
        .addSubcommand(sc =>
            sc
                .setName("profile")
                .setDescription("Get the profile of a user")
                .addStringOption(o =>
                    o
                        .setName("user")
                        .setDescription("Name of the user")
                        .setRequired(true)
                )
        )
    ,
    "action": github
}

