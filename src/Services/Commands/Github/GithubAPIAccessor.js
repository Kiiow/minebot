const { request } = require("../../Request");
const UrlBuilder = require("../../UrlBuilder");

const BASE_URL = "https://api.github.com/";

const GITHUB_API_HEADER = {
    "Content-type": "application/json"
};

function getRepositories(user) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`users/${user}/repos`);
    return request(
        url.build(),
        {
            method: "GET",
            headers: GITHUB_API_HEADER
        }
    );
}

function getReleasesFromOrganization(organization, repository) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`repos/${organization}/${repository}/releases`);
    return request(
        url.build(),
        {
            method: "GET",
            headers: GITHUB_API_HEADER
        }
    );
}

function getProfile(user) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`users/${user}`);
    return request(
        url.build(),
        {
            method: "GET",
            headers: GITHUB_API_HEADER
        }
    );
}

module.exports = {
    getRepositories,
    getReleasesFromOrganization,
    getProfile
};