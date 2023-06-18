const { EmbedBuilder } = require("@discordjs/builders");
const { formatDate } = require("../../../Date.js");

class GithubProfileToEmbed {

    embed = undefined;
    data = {};

    constructor(title, data) {
        this.data = data;
        this.initEmbedBuilder({ name: title, color: 0x2B2D31 });
    }

    initEmbedBuilder({ name: name, color: color }) {
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
            .setColor(color)
            .setTitle(name)
            .setURL(this.data?.url)
            .setThumbnail(this.data?.avatar_url)
            .setDescription(this.data?.bio)
            .addFields(
                { name: (numberOfRepository > 0 ? "Repositories" : "Repository"), value: `${numberOfRepository}`, inline: true },
                { name: "Created", value: formatDate(new Date(this.data?.created_at), "dd/mm/yyyy"), inline: true }
            )
            .setFooter({
                text: footerItems.join(" | "),
                iconURL: "https://cdn-icons-png.flaticon.com/512/25/25231.png"
            })
        ;
    }

    getEmbed() { return this.embed; }
}

module.exports = {
    GithubProfileToEmbed
}