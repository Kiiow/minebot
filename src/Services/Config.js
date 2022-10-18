function loadConfig() {
    require("dotenv").config({ path: ".env" });
}

module.exports = loadConfig;