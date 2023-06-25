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
            if(data?.message === "Not Found") {
                this.interaction.reply(`No repository found \`${this.user}/${this.repository}\``);
                return;
            }
            if(data?.length == 0) {
                this.interaction.reply(`No release found for the repository \`${this.user}/${this.repository}\``)
                return;
            }
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
            if(data?.message === "Not Found") {
                this.interaction.reply(`No user found with name \`${this.user}\``);
                return;
            }
            if(data?.length == 0) {
                this.interaction.reply(`No repository found for user \`${this.user}\``)
                return;
            }
            let embedResponse = (new GithubReposToEmbed(data)).getEmbed();
            this.interaction.reply({ embeds: [embedResponse] });
            return;
        } catch (err) {
            console.log(err);
            this.interaction.reply("Error while executing the command");
        }
    }

    async profile() {
        try {
            let data = await getProfile(this.user);
            if(data?.message === "Not Found") {
                this.interaction.reply(`No user found with name \`${this.user}\``);
                return;
            }
            let embedResponse = (new GithubProfileToEmbed(data)).getEmbed();
            this.interaction.reply({ embeds: [embedResponse] });
        } catch (err) {
            console.log(err);
            this.interaction.reply("Error while executing the command");
        }
    }
}

module.exports = {
    GithhubHandler
}