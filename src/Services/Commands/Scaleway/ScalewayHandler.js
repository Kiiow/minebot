const { listServers, statusServer, startServer, stopServer } = require("./ScalewayAPIAccessor.js");
const { ScalewayResultEmbed } = require("./ScalewayResultEmbed");

class ScalewayHandler {

    interaction;

    constructor(interaction) {
        this.interaction = interaction;
        this.serverId = interaction.options.getString("server_id");
    }

    async list() {
        const data = await listServers();
        const embedResponse = (new ScalewayResultEmbed("Server list")).embedServersStatus(data);
        this.interaction.reply({ embeds: [embedResponse] });
    }

    async status() {
        const data = await statusServer(this.serverId);
        const embedResponse = (new ScalewayResultEmbed("Status")).embedAServerStatus(data);
        this.interaction.reply({ embeds: [embedResponse] });
    }

    async start() {
        await startServer(this.serverId);
        const data = await statusServer(this.serverId);
        const embedResponse = (new ScalewayResultEmbed("Start")).embedAServerStatus(data);
        this.interaction.reply({ embeds: [embedResponse] });
    }

    async stop() {
        await stopServer(this.serverId);
        const data = await statusServer(this.serverId);
        const embedResponse = (new ScalewayResultEmbed("Stop")).embedAServerStatus(data);
        this.interaction.reply({ embeds: [embedResponse] });
    }
}

module.exports = {
    ScalewayHandler
}