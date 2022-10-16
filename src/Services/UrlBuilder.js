class UrlBuilder {

    url = undefined;
    path = undefined;
    params = new Map();

    constructor(url) {
        this.url = url;
        this.path = "";
    }

    setPath(path) {
        this.path = path;
        return this;
    }

    addParams(key, value) {
        this.params.set(key, value);
        return this;
    }

    build() {
        let url = `${this.url}${this.path}?`;
        for(let [key, value] of this.params) {
            url += `${key}=${value}&`;
        }

        return url;
    }
}

module.exports = UrlBuilder;