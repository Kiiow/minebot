const { EmbedBuilder } = require("@discordjs/builders");
const { ghfork, ghstar, ghissue, gheye } = require("../../../Tools/Emote.js");
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
        const MAX_TOPICS = 5;

        if (Array.isArray(repo.topics)) {
            let topics = repo.topics.slice(0, MAX_TOPICS);
            lines.push(`\n${topics.map(item => `\`${item}\``).join(" ") }${repo.topics.length > MAX_TOPICS ? " ..." : ""}`);
        }
        lines.push(repo.description ?? "No description")
        lines.push(EMPTY_LINE)
        // lines.push(`Ssh: \`${repo.ssh_url}\``)
        lines.push(`Link: ${repo.html_url}`)
        this.embed.addFields(
            {
                name: `${index}) ${repo.name} (*${repo.forks}* ${ghfork} | *${repo.stargazers_count}* ${ghstar} | *${repo.open_issues}* ${ghissue} | *${repo.watchers}* ${gheye} )`,
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