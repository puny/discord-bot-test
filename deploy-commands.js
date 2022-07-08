const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('info').setDescription('Replies with info!'),
    new SlashCommandBuilder().setName('imgur').setDescription('Replies with imgur!'),
    new SlashCommandBuilder().setName('button').setDescription('Replies with button!'),
    new SlashCommandBuilder().setName('embed').setDescription('Replies with embed!'),
    new SlashCommandBuilder().setName('api').setDescription('Replies with api!'),
    new SlashCommandBuilder().setName('canvas').setDescription('Replies with canvas!'),

    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!')
        .addStringOption( option => option.setName('input').setRequired(true).setDescription('Enter a string'))        
        .addStringOption( option => option.setName('category').setRequired(true)
            .addChoices(
                { name: 'Item1', value: 'value1' },
                { name: 'Item2', value: 'value2' },
                { name: 'Item3', value: 'value3' },
            ).setDescription('Select Category') )
        .addAttachmentOption( opt => opt.setName('attachment').setRequired(true).setDescription('Attach something') )
        .addBooleanOption( option => option.setName('choice').setDescription('Select a boolean') )
        .addUserOption( option => option.setName('target').setDescription('Select a user') )
        .addChannelOption( option => option.setName('destination').setDescription('Select a channel') )
        .addRoleOption( option => option.setName('muted').setDescription('Select a role') )
        .addMentionableOption( opt => opt.setName('mentionable').setDescription('Mention something') )
        .addNumberOption( opt => opt.setName('num').setDescription('Enter a number') ),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);