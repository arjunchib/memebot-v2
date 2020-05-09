const fs = require("fs");
const path = require("path");

module.exports = (id) => {
  return fs.readFileSync(path.resolve(__dirname, id), "utf8");
};
