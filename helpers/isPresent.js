const isNullOrUndefined = require("./isNullOrUndefined");
const isEmpty = require("./isEmpty");

const isPresent = (data) => {
  if (isNullOrUndefined(data)) {
    return false;
  }
  if (isEmpty(data)) {
    return false;
  }
  return true;
}

module.exports = isPresent;
