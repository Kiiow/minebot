function formatDate(date, format) {
    let dateFormatted  = format;

    dateFormatted = dateFormatted.replace("yyyy", date.getFullYear());
    dateFormatted = dateFormatted.replace("mm", formatToTwoNumber(date.getMonth()));
    dateFormatted = dateFormatted.replace("dd", formatToTwoNumber(date.getDate()));
    dateFormatted = dateFormatted.replace("h", formatToTwoNumber(date.getHours()));
    dateFormatted = dateFormatted.replace("i", formatToTwoNumber(date.getMinutes()));
    dateFormatted = dateFormatted.replace("s", formatToTwoNumber(date.getSeconds()));

    return dateFormatted;
}

function formatToTwoNumber(string) {
    return `0${string}`.slice(-2);
}

module.exports = {
    formatDate
}