const { EmbedBuilder } = require("@discordjs/builders");
const R = require("ramda");
const EMPTY_LINE = "** **";
const DEFAULT_COLOR = 0x2B2D31;

class DiscordEmbed {

    embed;
    data = {};
    colors = {
        "info": [0, 123, 255],
        "success": [40, 167, 69],
        "warn": [255, 193, 7],
        "error": [220, 53, 69],
    }

    constructor(data) {
        this.data = data;
        this.embed = new EmbedBuilder();
        this.embed.setAuthor({ name: "Hello" }).setDescription("Ayoh");
    }

    setTitle(title) {
        this.embed.setTitle(title);
        return this;
    }

    setUrl(url) {
        this.embed.setURL(url);
        return this;
    }

    setAuthor({ "name": name, "iconURL": iconURL, "url": url}) {
        this.embed.setAuthor({
            "name": name,
            "iconURL": iconURL,
            "url": url
        });
        return this;
    }

    setDescription(description) {
        this.embed.setDescription(description);
        return this;
    }

    setThumbnail(thumbnail) {
        this.embed.setThumbnail(thumbnail);
        return this;
    }

    addFields(listOfFields) {
        this.embed.addFields(listOfFields);
        return this;
    }

    setImage(image) {
        this.embed.setImage(image);
        return this;
    }

    setTimestamp() {
        this.embed.setTimestamp();
        return this;
    }

    setFooter({ "text": text, "iconUrl": iconUrl }) {
        this.embed.setFooter({
            "text": text,
            "iconURL": iconUrl
        });
        return this;
    }

    setColorToDefautltBackground() {
        this.embed.setColor(DEFAULT_COLOR);
        return this;
    }

    setColorStatus(status) {
        this.embed.setColor(R.defaultTo(DEFAULT_COLOR, this.colors[status]));
        return this;
    }

    setColor(color) {
        this.embed.setColor(color);
        return this;
    }

    getEmbed() {
        return this.embed;
    }

}

module.exports = {
    DiscordEmbed
}