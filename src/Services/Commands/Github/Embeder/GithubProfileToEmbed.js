const { EmbedBuilder } = require("@discordjs/builders");
const { formatDate } = require("../../../Tools/Date.js");

class GithubProfileToEmbed {

    embed = undefined;
    data = {};

    constructor(data) {
        this.data = data;
        this.initEmbedBuilder();
    }

    initEmbedBuilder() {
        let numberOfRepository = this.data?.public_repos;
        let footerItems = [];
        if(this.data?.twitter_username) {
            footerItems.push(`Twitter: ${this.data?.twitter_username}`);
        }
        footerItems.push(
            `Followers: ${this.data?.followers}`,
            `Following: ${this.data?.following}`
        );
        this.embed = new EmbedBuilder()
            .setAuthor({
                name: this.data?.login,
                iconURL: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
                url: this.data?.html_url
            })
            .setColor(0x2B2D31)
            .setThumbnail(this.data?.avatar_url)
            .setDescription(this.data?.bio)
            .addFields(
                { name: (numberOfRepository > 0 ? "Repositories" : "Repository"), value: `${numberOfRepository}`, inline: true },
                { name: "Created", value: formatDate(new Date(this.data?.created_at), "dd/mm/yyyy"), inline: true }
            )
            .setFooter({
                text: footerItems.join(" | ")
            })
        ;
    }

    getEmbed() { return this.embed; }
}

module.exports = {
    GithubProfileToEmbed
}