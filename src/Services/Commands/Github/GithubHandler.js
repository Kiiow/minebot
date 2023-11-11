const { GithubProfileToEmbed } = require("./Embeder/GithubProfileToEmbed");
const { GithubReleasesToEmbed } = require("./Embeder/GithubReleasesToEmbed");
const { GithubReposToEmbed } = require("./Embeder/GithubReposToEmbed");
const { getReleasesFromOrganization, getRepositories, getProfile } = require("./GithubAPIAccessor");
const { embedError } = require("../../DiscordEmbed/EmbedFactory.js");

const NO_DATA = "Not Found";

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
            if(handleError(data?.message === NO_DATA, `No repository found \`${this.user}/${this.repository}\``)) return;
            if(handleError(data?.length == 0, `No release found for the repository \`${this.user}/${this.repository}\``)) return;

            const embedResponse = (new GithubReleasesToEmbed(data)).getEmbed();
            this.interaction.reply({ embeds: [ embedResponse ] });
        } catch (err) {
            console.log(err);
            this.interaction.reply("Error while executing the command");
        }
    }

    async repos() {
        try {
            let data = await getRepositories(this.user);

            if(handleError(data?.message === NO_DATA, `No user found with name \`${this.user}\``)) return;
            if(handleError(data?.length == 0, `No repository found for user \`${this.user}\``)) return;

            let embedResponse = (new GithubReposToEmbed(data)).getEmbed();
            this.interaction.reply({ embeds: [embedResponse] });
            return;
        } catch (err) {
            console.log(err);
            this.interaction.reply({ embeds: [ embedError("Error while executing the command") ] });
        }
    }

    async profile() {
        try {
            let data = await getProfile(this.user);
            if(handleError(data?.message === NO_DATA, `No user found with name \`${this.user}\``)) return;

            let embedResponse = (new GithubProfileToEmbed(data)).getEmbed();
            this.interaction.reply({ embeds: [embedResponse] });
        } catch (err) {
            console.log(err);
            this.interaction.reply({ embeds: [ embedError("Error while executing the command") ] });
        }
    }

    handleError(condition, errorMessage) {
        if(condition) return false;
        this.interaction.reply({ embeds: [ embedError(errorMessage) ] });
        return true;
    }
}

module.exports = {
    GithhubHandler
}