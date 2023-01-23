const { GithubReleasesToEmbed } = require("./Embeder/GithubReleasesToEmbed");
const { GithubReposToEmbed } = require("./Embeder/GithubReposToEmbed");
const { getReleasesFromOrganization, getReposFromOrganization, getReposFromUser } = require("./GithubAPIAccessor");

class GithhubHandler {

    interaction;

    organization;
    user;
    repository;

    constructor(interaction) {
        this.interaction = interaction;
        this.organization = interaction.options.getString("org");
        this.user = interaction.options.getString("user");
        this.repository = interaction.options.getString("repos");
    }

    async releases() {
        try {
            let data = await getReleasesFromOrganization(this.organization, this.repository);
            const embedResponse = (new GithubReleasesToEmbed("Releases", data)).getEmbed();
            this.interaction.reply({ embeds: [ embedResponse ] });
        } catch(err) {
            console.log(err);
            this.interaction.reply("Error while executing the github request");
        }
    }

    async repos(from) {
        try {
            let data = {};
            let embedResponse = undefined;
            switch(from) {
                case "users":
                    data = await getReposFromUser(this.user);
                    embedResponse = (new GithubReposToEmbed("Users repositories", data)).getEmbed();
                    this.interaction.reply({ embeds: [embedResponse] });
                    return;
                case "orgs":
                    data = await getReposFromOrganization(this.organization);
                    embedResponse = (new GithubReposToEmbed("Organization repositories", data)).getEmbed();
                    this.interaction.reply({ embeds: [embedResponse] });
                    return;
            }
            this.interaction.reply(`Unexpected request ${from}`);
        } catch(err) {
            console.log(err);
            this.interaction.reply("Error while executing the github request");
        }
    }
}

module.exports = {
    GithhubHandler
}