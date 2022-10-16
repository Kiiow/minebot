const { ping } = require("./Commands/Ping.js");

module.exports = {
    "commands" : [
        {
            "name": "ping",
            "description": "Replies with Pong",
            "action": ping
        }
    ]
}