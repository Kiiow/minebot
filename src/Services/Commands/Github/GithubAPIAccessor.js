const UrlBuilder = require("../../UrlBuilder");
const { GithubGETRequest } = require("./GithubRequest");

const BASE_URL = "https://api.github.com/";

function getRepositories(user) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`users/${user}/repos`);
    return GithubGETRequest(url);
}

function getReleasesFromOrganization(organization, repository) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`repos/${organization}/${repository}/releases`);
    return GithubGETRequest(url);
}

function getProfile(user) {
    let url = (new UrlBuilder(BASE_URL)).setPath(`users/${user}`);
    return GithubGETRequest(url);
}

module.exports = {
    getRepositories,
    getReleasesFromOrganization,
    getProfile
};