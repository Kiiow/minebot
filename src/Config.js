const dotenv = require("dotenv");

function loadConfig() {
    dotenv.config({ path: ".env.local" });
    dotenv.config({ path: ".env" });
}

module.exports = {
    loadConfig
}