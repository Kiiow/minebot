const { EmbedBuilder } = require("@discordjs/builders");

class GithubReleasesToEmbed {

    embed = undefined;
    data = {};

    constructor(title, data) {
        this.data = data;
        this.initEmbedBuilder({ name: title, color: 0x2B2D31 });
        this.embedReleases();
    }

    initEmbedBuilder({ name: name, color: color }) {
        let avatar_url = "";
        if(this.data.length > 0) {
            avatar_url = this.data[0].author?.avatar_url;
        }
        this.embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: name, iconURL: avatar_url });
    }

    embedReleases() {
        this.data.forEach( (release) => {
            this.addReleaseAsEmbed(release);
        })
    }

    addReleaseAsEmbed(release) {
        let downloadCount = 0;
        release.assets.forEach( (asset) => {
            downloadCount += asset.download_count;
        })

        this.embed.addFields(
            { name: "Name", value: `[${release.name}](${release.url})`, inline: true },
            { name: "Release date", value: (new Date(release.published_0at)).toLocaleString(), inline: true },
            { name: "Downloads", value: `${downloadCount}`, inline: true }
        );
    }

    getEmbed() { return this.embed; }
}

module.exports = {
    GithubReleasesToEmbed
}