require("dotenv").config();

const Discord = require("discord.js");
const { GraphQLClient } = require("graphql-request");
const handleMessage = require("./handle-message");

const client = new Discord.Client();
const endpoint = `${process.env.MEMEBOT_API_ENDPOINT}/graphql`;
const graphqlClient = new GraphQLClient(endpoint);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => handleMessage(message, graphqlClient));

client.login(process.env.DISCORD_TOKEN);
