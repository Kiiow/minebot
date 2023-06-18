const { GithubProfileToEmbed } = require("./Embeder/GithubProfileToEmbed");
const { GithubReleasesToEmbed } = require("./Embeder/GithubReleasesToEmbed");
const { GithubReposToEmbed } = require("./Embeder/GithubReposToEmbed");
const { getReleasesFromOrganization, getRepositories, getProfile } = require("./GithubAPIAccessor");

class GithhubHandler {

    interaction;
    organization;
    user;
    repository;

    constructor(interaction) {
        this.interaction = interaction;
        this.user = interaction.options.getString("user");
        this.repository = interaction.options.getString("repos");
    }

    async releases() {
        try {
            let data = await getReleasesFromOrganization(this.user, this.repository);
            const embedResponse = (new GithubReleasesToEmbed("Releases", data)).getEmbed();
            this.interaction.reply({ embeds: [ embedResponse ] });
        } catch (err) {
            console.log(err);
            this.interaction.reply("Error while executing the github request");
        }
    }

    async repos() {
        try {
            let embedResponse = undefined;
            let data = await getRepositories(this.user);
            embedResponse = (new GithubReposToEmbed("Users repositories", data)).getEmbed();
            this.interaction.reply({ embeds: [embedResponse] });
            return;
        } catch (err) {
            console.log(err);
            this.interaction.reply("Error while executing the github request");
        }
    }

    async profile() {
        try {
            let data = await getProfile(this.user);
            let embedResponse = (new GithubProfileToEmbed(data?.name, data)).getEmbed();
            this.interaction.reply({ embeds: [embedResponse] });
        } catch (err) {
            console.log(err);
            this.interaction.reply("Error while executing the github request");
        }
    }
}

module.exports = {
    GithhubHandler
}