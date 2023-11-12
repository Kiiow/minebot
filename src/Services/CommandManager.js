const R = require("ramda");
class CommandManager {
    
    commands;
    
    constructor(commands) {
        this.commands = commands;
    }

    async parseInterraction(interaction) {
        const COMMAND_NAME = interaction.commandName;
        const COMMAND = R.find(R.propEq("name", COMMAND_NAME))(this.commands);

        if(COMMAND) {
            try {
                await COMMAND.action(interaction);
            } catch(err) {
                console.log(err);
            }
        } else {
            await interaction.reply(`Command ${COMMAND_NAME} not found`);
        }
    }
}

module.exports = {
    CommandManager
}