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
            method: "GET",
            headers: { "X-Auth-Token": process.env.SCA_API_TOKEN }
        });
        const data = await response.json();

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
        });
        this.interaction.reply({ embeds: [embedListResponse] });
    }

    async status() {
        let urlBuilder = (new UrlBuilder("https://api.scaleway.com/instance/v1/"))
            .setPath(`/zones/fr-par-1/servers/${this.serverId}`);
        
        const response = await fetch(urlBuilder.build(), {
            method: "GET",
            headers: { "X-Auth-Token": process.env.SCA_API_TOKEN }
        });
        const data = await response.json();
        // console.log(data);

        const embedListResponse = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: 'Status', iconURL: 'https://avatars.githubusercontent.com/u/5185491?s=200&v=4' })
            .addFields(
                { name: "Status", value: `${this.getColorByState(data.server.state)} ${data.server.state}`, inline: true},
                { name: data.server.name, value: data.server.id, inline: true},
                { name: "type", value: data.server.commercial_type, inline: true}
            );
        
        this.interaction.reply({ embeds: [embedListResponse] });
    }

    async start() {
        let urlBuilderStart = (new UrlBuilder("https://api.scaleway.com/instance/v1/"))
            .setPath(`/zones/fr-par-1/servers/${this.serverId}/action`);
        
        const startRequest = await fetch(urlBuilderStart.build(), {
            method: "POST",
            body: JSON.stringify({
                action : "poweron"
            }),
            headers: {
                "X-Auth-Token": process.env.SCA_API_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        const result = await startRequest.json();
        console.log(result);

        this.interaction.reply("Starting server, maybe ...");

        // let urlBuilder = (new UrlBuilder("https://api.scaleway.com/instance/v1/"))
        //     .setPath(`/zones/fr-par-1/servers/${this.serverId}`);

        // const statusRequest = await fetch(urlBuilder.build(), {
        //     method: "GET",
        //     headers: { "X-Auth-Token": process.env.SCA_API_TOKEN }
        // });
        // const data = await statusRequest.json();
        // console.log(data);

        // const embedListResponse = new EmbedBuilder()
        //     .setColor(0x0099FF)
        //     .setAuthor({ name: 'Start server', iconURL: 'https://avatars.githubusercontent.com/u/5185491?s=200&v=4' })
        //     .addFields(
        //         { name: "Status", value: `${this.getColorByState(data.server.state)} ${data.server.state}`, inline: true},
        //         { name: data.server.name, value: data.server.id, inline: true},
        //         { name: "type", value: data.server.commercial_type, inline: true}
        //     );
        
        // this.interaction.reply({ embeds: [embedListResponse] });
    }

    async stop() {
        let urlBuilderStop = (new UrlBuilder("https://api.scaleway.com/instance/v1/"))
            .setPath(`/zones/fr-par-1/servers/${this.serverId}/action`);
        
        const stopRequest = await fetch(urlBuilderStop.build(), {
            method: "POST",
            body: JSON.stringify({
                "action": "poweroff"
            }),
            headers: {
                'Content-Type': 'application/json',
                "X-Auth-Token": process.env.SCA_API_TOKEN
            }
        });
        const result = await stopRequest.json();
        console.log(result);

        this.interaction.reply("Stopping server, maybe ...");

        // let urlBuilder = (new UrlBuilder("https://api.scaleway.com/instance/v1/"))
        //     .setPath(`/zones/fr-par-1/servers/${this.serverId}`);

        // const statusRequest = await fetch(urlBuilder.build(), {
        //     "method": "get",
        //     "headers": { "X-Auth-Token": process.env.SCA_API_TOKEN }
        // });
        // const data = await statusRequest.json();
        // console.log(data);

        // const embedListResponse = new EmbedBuilder()
        //     .setColor(0x0099FF)
        //     .setAuthor({ name: 'Stop server', iconURL: 'https://avatars.githubusercontent.com/u/5185491?s=200&v=4' })
        //     .addFields(
        //         { name: "Status", value: `${this.getColorByState(data.server.state)} ${data.server.state}`, inline: true},
        //         { name: data.server.name, value: data.server.id, inline: true},
        //         { name: "type", value: data.server.commercial_type, inline: true}
        //     );
        
        // this.interaction.reply({ embeds: [embedListResponse] });
    }
}

module.exports = {
    ScalewayManager
}