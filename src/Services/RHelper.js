const R = require("ramda");

const endWithList = (string, list) => R.any(R.endsWith(R.__, string), (list));
const getKeyValues = (key, list) =>  R.map(item => R.pick([key], item)[key], list);

module.exports = {
    endWithList,
    getKeyValues
}