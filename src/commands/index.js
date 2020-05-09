const fs = require("fs");

module.exports = fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .reduce((acc, name) => {
    acc[name] = require(`./${name}`);
    return acc;
  }, {});
