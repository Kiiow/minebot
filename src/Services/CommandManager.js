class CommandManager {
    
    commands;
    
    constructor(commands) {
        this.commands = commands;
    }

    async parseInterraction(interaction) {
        if(interaction.commandName === "ping") {
            await interaction.reply("Pong!");
        }
    }
}

module.exports = {
    CommandManager
}