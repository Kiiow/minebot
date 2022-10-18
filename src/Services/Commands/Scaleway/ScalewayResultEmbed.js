const { EmbedBuilder } = require("discord.js");

class ScalewayResultEmbed {

    embed = undefined;

    constructor(title) {
        this.initEmbedBuilder({ name: title, color: 0x0099FF, avatar_url: 'https://avatars.githubusercontent.com/u/5185491?s=200&v=4' });
    }

    initEmbedBuilder({ name: name, color: color, avatar_url: avatar_url }) {
        this.embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: name, iconURL: avatar_url });
    }
    
    embedServersStatus(data) {
        data.servers.forEach( (server) => {
            this.addServerAsFieldEmbed(server);
        })
    
        return this.embed;
    }
    
    embedAServerStatus(data) {
        this.addServerAsFieldEmbed(data.server);
        return this.embed;
    }
    
    addServerAsFieldEmbed(server) {
        this.embed.addFields(
            { name: "Status", value: `${this.getColorByState(server.state)} ${server.state}`, inline: true},
            { name: server.name, value: server.id, inline: true},
            { name: "IP", value: server.public_ip.address, inline: true}
        )
    }
    
    getColorByState(state) {
        switch(state) {
            case "running":
                return ":green_circle:";
            case "stopped":
            case "stopped in place":
                return ":red_circle:";
            case "stopping":
                return ":orange_circle:";
            case "starting":
                return ":blue_circle:";
            case "locked":
                return ":black_circle:";
            default:
                return ":interrobang:";
        }
    }
}

module.exports = {
    ScalewayResultEmbed
}