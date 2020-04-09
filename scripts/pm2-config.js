const fs = require("fs");

const envVariables = process.argv.slice(2);
const pm2ConfigPath = `${process.env.GITHUB_WORKSPACE}/ecosystem.config.json`;

const pm2Config = JSON.parse(fs.readFileSync(pm2ConfigPath));

envVariables.forEach((x) => (pm2Config.apps[0].env[x] = process.env[x]));

fs.writeFileSync(pm2ConfigPath, JSON.stringify(pm2Config));
