function loadConfig() {
    require("dotenv").config({ path: ".env" });
    require("dotenv").config({ path: ".env.local" });
}

module.exports = {
    loadConfig
}