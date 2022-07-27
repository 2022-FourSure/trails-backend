const isNullOrUndefined = require("./isNullOrUndefined");
const isEmpty = require("./isEmpty");

const isPresent = (data) => !isEmpty(data) && !isNullOrUndefined(data);

module.exports = isPresent;
