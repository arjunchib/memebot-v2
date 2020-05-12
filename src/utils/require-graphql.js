const fs = require("fs");
const path = require("path");

module.exports = (dirname, id) => {
  return fs.readFileSync(path.resolve(dirname, id), "utf8");
};
