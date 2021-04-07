class Validator {
  isValid(data) {
    return !(data.title.trim() === "" || data.body.trim() === "");
  }
}

module.exports = { Validator };
