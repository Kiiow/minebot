const { EmbedBuilder } = require("@discordjs/builders");
const EMPTY_LINE = "** **";

class GithubReposToEmbed {

    embed = undefined;
    data = {};

    constructor(data) {
        this.data = data;
        this.initEmbedBuilder();
        this.embedRepos();
    }

    initEmbedBuilder() {
        let avatar_url = "";
        if(this.data.length > 0) {
            avatar_url = this.data[0].owner?.avatar_url;
        }
        this.embed = new EmbedBuilder()
            .setAuthor({
                name: this.data.length > 0 ? "Repositories" : "Repository",
                iconURL: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
                url: this.data?.html_url
            })
            .setColor(0x2B2D31)
            .setThumbnail(avatar_url);
    }

    embedRepos() {
        // TODO: add left and right button with pagination every 5 items
        this.data.slice(0, 5).forEach( (repo, index) => {
            this.addRepoAsEmbed(repo, ++index);
        })
    }

    addRepoAsEmbed(repo, index) {
        let lines = [];
        if (Array.isArray(repo.topics)) {
            lines.push(`\n${repo.topics.map(item => `\`${item}\``).join(" ") }`);
        }
        lines.push(repo.description);
        lines.push(EMPTY_LINE);
        lines.push(`Ssh: \`${repo.ssh_url}\``);
        lines.push(`Link: ${repo.html_url}`)
        this.embed.addFields(
            {
                name: `\`${index}\`. ${repo.name} (${repo.stargazers_count} :star:)`,
                value: lines.join("\n"),
                inline: false
            },
        );
    }

    getEmbed() { return this.embed; }
}

module.exports = {
    GithubReposToEmbed
}