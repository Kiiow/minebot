function formatDate(date, format) {
    if(typeof date != Date) {
        date = new Date(date);
    }
    let dateFormatted  = format;


    dateFormatted = dateFormatted.replace("yyyy", date.getFullYear());
    dateFormatted = dateFormatted.replace("mm", formatToTwoNumber(date.getMonth() + 1));
    dateFormatted = dateFormatted.replace("dd", formatToTwoNumber(date.getDate()));
    dateFormatted = dateFormatted.replace("h", formatToTwoNumber(date.getHours()));
    dateFormatted = dateFormatted.replace("i", formatToTwoNumber(date.getMinutes()));
    dateFormatted = dateFormatted.replace("s", formatToTwoNumber(date.getSeconds()));

    return dateFormatted;
}

function formatToTwoNumber(string) {
    return `0${string}` . slice(-2);
}

module.exports = {
    formatDate
}