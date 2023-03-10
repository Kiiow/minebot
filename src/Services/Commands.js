const Github = require("./Commands/Github/Github.js");
const Ping = require("./Commands/Ping.js");
const Scaleway = require("./Commands/Scaleway/Scaleway.js");

module.exports = {
    "commands" : [
        {
            ...Ping.slashBuilder.toJSON(),
            "action" : Ping.action
        },
        {
            ...Scaleway.slashBuilder.toJSON(),
            "action" : Scaleway.action
        },
        {
            ...Github.slashBuilder.toJSON(),
            "action": Github.action
        }
    ]
}
