class UrlBuilder {

    url = undefined;
    path = undefined;
    params = new Map();

    constructor(url) {
        this.url = url;
        this.path = "";
    }

    setPath(path) {
        this.path = encodeURI(path);
        return this;
    }

    addParams(key, value) {
        this.params.set(encodeURI(key), encodeURI(value));
        return this;
    }

    build() {
        let url = `${this.url}${this.path}`;
        if(this.params.size > 0) {
            url += '?';
            for(let [key, value] of this.params) {
                url += `${key}=${value}&`;
            }
        }

        return url;
    }
}

module.exports = UrlBuilder;