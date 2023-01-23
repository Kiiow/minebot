const { EmbedBuilder } = require("@discordjs/builders");

class GithubReposToEmbed {

    embed = undefined;
    data = {};

    constructor(title, data) {
        this.data = data;
        this.initEmbedBuilder({ name: title, color: 0x0099FF });
        this.embedRepos();
    }

    initEmbedBuilder({ name: name, color: color }) {
        let avatar_url = "";
        if(this.data.length > 0) {
            avatar_url = this.data[0].owner?.avatar_url;
        }
        this.embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: name, iconURL: avatar_url });
    }

    embedRepos() {
        this.data.forEach( (repo) => {
            this.addRepoAsEmbed(repo);
        })
    }

    addRepoAsEmbed(repo) {
        this.embed.addFields(
            { name: "Name", value: repo.name, inline: true },
            { name: "SSH", value: `\`${repo.ssh_url}\``, inline: true },
            { name: "** **", value: `${repo.stargazers_count} :star:`, inline: true }
        );
    }

    getEmbed() { return this.embed; }
}

module.exports = {
    GithubReposToEmbed
}