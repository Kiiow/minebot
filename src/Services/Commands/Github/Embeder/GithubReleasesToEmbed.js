const { EmbedBuilder } = require("@discordjs/builders");
const R = require("ramda");
const { formatDate } = require("../../../Tools/Date.js");
const { endWithList, getKeyValues } = require("../../../Tools/RHelper.js");

class GithubReleasesToEmbed {

    embed = undefined;
    data = {};

    constructor(data) {
        this.data = data;
        this.initEmbedBuilder({ color: 0x2B2D31 });
        this.embedReleases();
    }

    initEmbedBuilder({ color: color }) {
        let avatar_url = "";
        if(this.data.length > 0) {
            avatar_url = this.data[0].author?.avatar_url;
        }
        this.embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: "Releases", iconURL: avatar_url });
    }

    embedReleases() {
        // TODO: add navigation key to check every releases
        let formattedRelease = R.map(this.getFormattedRelease, this.data).slice(0, 10);

        const getFormattedKey = (key) => getKeyValues(key, formattedRelease).join("\r\n");

        this.embed.addFields(
            { name: "Name", value: getFormattedKey("release_name"), inline: true },
            { name: "Release date", value: getFormattedKey("date"), inline: true },
            { name: "Downloads", value: getFormattedKey("download_count"), inline: true }
        );
    }

    getFormattedRelease(release) {
        let downloadCount = 0;
        let extension = [".yml", ".blockmap"];
        
        (R.filter( item => !endWithList(item?.name, extension))(release.assets)).forEach( (item) => {
            downloadCount += item.download_count;
        });

        return {
            release_name: `[${release.tag_name}](${release.html_url})`,
            date: formatDate(release.published_at, "dd/mm/yyyy h:i"),
            download_count: downloadCount
        }
    }

    getEmbed() { return this.embed; }
}

module.exports = {
    GithubReleasesToEmbed
}