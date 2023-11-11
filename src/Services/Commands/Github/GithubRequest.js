const { request } = require("../../Request")

module.exports = {
    GITHUB_API_HEADER: {
        "Content-type": "application/json"
    },
    GithubGETRequest: (url) => {
        return request(
            url.build(),
            {
                method: "GET",
                headers: this.GITHUB_API_HEADER
            }
        )
    }
}