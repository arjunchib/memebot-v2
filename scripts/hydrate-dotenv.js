const fs = require("fs");
const path = require("path")
const dotenv = require("dotenv")

const workspace = process.env.GITHUB_WORKSPACE
const envExamplePath = path.resolve(workspace, '.env.example')
const envPath = path.resolve(workspace, '.env')

const config = dotenv.parse(fs.readFileSync(envExamplePath))
const lines = Object.keys(config).map(env => `${env}=${process.env[env]}`);

fs.writeFileSync(envPath, lines.join('\n'));
