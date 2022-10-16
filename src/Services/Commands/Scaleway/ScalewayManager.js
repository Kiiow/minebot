const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const UrlBuilder = require("../../UrlBuilder.js");

class ScalewayManager {

    interaction;

    constructor(interaction) {
        this.interaction = interaction;
        this.serverId = interaction.options.getString("server_id");
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

    async list() {

        let urlBuilder = (new UrlBuilder("https://api.scaleway.com/instance/v1/"))
            .setPath("/zones/fr-par-1/servers");
        
        const response = await fetch(urlBuilder.build(), {
            "method": "get",
            "headers": { "X-Auth-Token": process.env.SCA_API_TOKEN }
        });
        const data = await response.json();
        // console.log(data);

        if(!data.servers) {
            return this.interaction.reply(`Mmh u said list, right ?`);
        }
        
        const embedListResponse = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: 'Server list', iconURL: 'https://avatars.githubusercontent.com/u/5185491?s=200&v=4' });
        
        data.servers.forEach( (server) => {
            // console.log(server);
            embedListResponse.addFields(
                { name: "Status", value: `${this.getColorByState(server.state)} ${server.state}`, inline: true},
                { name: server.name, value: server.id, inline: true},
                { name: "type", value: server.commercial_type, inline: true}
            );
        })
        this.interaction.reply({ embeds: [embedListResponse] });
    }

    status() {
        this.interaction.reply(`Mmh u said status, right ? with id ${server_id}`);
    }

    start() {
        this.interaction.reply(`Mmh u said start, right ? with id ${server_id}`);
    }

    stop() {
        this.interaction.reply(`You sure ? u said stop right ? with id ${server_id}`);
    }
}

module.exports = {
    ScalewayManager
}