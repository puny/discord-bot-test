const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ],
});
const { token } = require("./config.json");

const embed = require('./embed.js');
const canvas = require('./canvas.js');
const button = require('./button.js');
const commands = require('./commands.js');
const message = require('./message.js');
const { MessageType } = require("discord-api-types/v9");
const wait = require('node:timers/promises').setTimeout;

const PREFIX = '!';

client.on("ready", () => {
    console.log(`${client.user.tag} logged in!`);
});

client.on('messageCreate', async msg => {
    let args = msg.content.substring(PREFIX.length).split(' ');

    switch (args[0]) {
        case 'play':
            message.image(msg);
            break;
    
        default:
            break;
    }
});


client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'embed') embed.info(interaction);
        if (interaction.commandName === 'server') commands.server(interaction);
        if (interaction.commandName === 'imgur') commands.imgur(interaction);
        if (interaction.commandName === 'button') commands.button(interaction);
        if (interaction.commandName === 'api') commands.api(interaction);
        if (interaction.commandName === 'react') commands.react(interaction);
        if (interaction.commandName === 'canvas') canvas.profile(interaction);
    }
    else if (interaction.isButton()) {
        console.log('button click!');
    }
});


client.login( token );