const { DiscordEmbed } = require("./DiscordEmbed");

function embedStatus(status, { "message": message, "footer_text": footer_text, "footer_iconUrl": footer_iconUrl }) {
    let response = new DiscordEmbed();
    response
        .setColorStatus(status)
        .setDescription(message)
    ;
    if(footer_text) {
        response.setFooter({
            "text": footer_text,
            "iconUrl": footer_iconUrl ?? ""
        });
    }

    return response.getEmbed();
}

function embedError(message) {
    return embedStatus("error", { "message": message });
}

function embedInfo(message) {
    return embedStatus("info", { "message": message });
}

module.exports = {
    embedStatus,
    embedError,
    embedInfo
}