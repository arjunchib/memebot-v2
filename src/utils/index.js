const fs = require("fs");
const path = require("path");

module.exports = fs
  .readdirSync(__dirname)
  .filter((name) => name !== "index.js")
  .reduce((acc, name) => {
    const basename = path.basename(name, ".js");
    acc[basename] = require(`./${name}`);
    return acc;
  }, {});
