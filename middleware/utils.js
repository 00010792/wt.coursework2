const path = require("path");

const generateID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const root = path.dirname(require.main.filename);

const getCollection = function (collection) {
  return path.join(root, `database/${collection}`);
};

module.exports = {
  root,
  getCollection,
  generateID,
};
