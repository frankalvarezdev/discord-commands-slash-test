import {} from 'dotenv/config';

export default {
    name: 'ping',
    handler: async (interaction) => {
        await interaction.reply('pong! xd');
    }
}