import { Client, Intents, MessageEmbed } from 'discord.js';
import links from './commands/links.js';
import ping from './commands/ping.js';
import {} from 'dotenv/config';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    let commands = [links, ping];

    for (const command of commands) {
        if (interaction.commandName === command.name) {
            command.handler(interaction);
        }
    }
});

client.login(process.env.BOT_TOKEN);