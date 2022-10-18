const fetch = require("cross-fetch");

function request(url, options) {

    return fetch(url, options)
        .then(
            (res) => {
                return res.json();
            }
        )

}

module.exports = {
    request
};