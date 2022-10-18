const { request } = require("../../Request");
const UrlBuilder = require("../../UrlBuilder.js");

const BASE_URL = "https://api.scaleway.com/instance/v1/";

const POWERON = 'poweron';
const POWEROFF = 'poweroff';
const STOP_IN_PLACE = 'stop_in_place';
const REBOOT = 'reboot';
const TERMINATE = 'terminate';
const BACKUP = 'backup';

const SCALEWAY_API_HEADER =
{
    "X-Auth-Token": process.env.SCA_API_TOKEN,
    "Content-Type": "application/json"
}

function listServers() {
    let url = (new UrlBuilder(BASE_URL)).setPath("zones/fr-par-1/servers");

    return request(
        url.build(),
        {
            method: "GET",
            headers: SCALEWAY_API_HEADER
        }
    )
}

function statusServer(serverId) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`zones/fr-par-1/servers/${serverId}`);

    return request(
        url.build(),
        {
            method: "GET",
            headers: SCALEWAY_API_HEADER
        }
    );
}

function action(serverId, action) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`zones/fr-par-1/servers/${serverId}/action`);

    return request(
        url.build(),
        {
            method: "POST",
            body: JSON.stringify({
                action : action
            }),
            headers: SCALEWAY_API_HEADER
        }
    );
}

function startServer(serverId) {
    return action(serverId, POWERON);
}

function stopServer(serverId) {
    return action(serverId, POWEROFF);
}

module.exports = {
    listServers,
    statusServer,
    startServer,
    stopServer
};