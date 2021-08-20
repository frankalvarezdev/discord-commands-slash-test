import { MessageEmbed } from 'discord.js';
import Links from "./../lib/api.js";
import { } from 'dotenv/config';

export default {
    name: 'links',
    handler: async (interaction) => {

        // https://www.deezer.com/es/album/158053712
        let url = interaction.options.getString('url');

        const links = new Links(url, process.env.API_ENDPOINT);
        let albumData = await links.get();

        if (!albumData.error) {
            albumData = albumData.data
            let platforms = [];
            for (const link of albumData.links) {
                platforms.push({ name: link.platformName, value: link.url })
            }
            const embed = new MessageEmbed()
                .setColor('#FF9D07')
                .setTitle(`${albumData.artist} - ${albumData.title}`)
                .setDescription(`Genero: ${albumData.genre}\nExplicito: ${albumData.explicitness}\nupc: ${albumData.upc}`)
                .setThumbnail(albumData.cover)
                .addFields(...platforms)
                .setTimestamp()
                .setFooter('Linkyn', 'https://cdn.xpendmusic.com/assets/linkyn-b129d1f4def90809629.jpg');
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(albumData.error.message);
        }
    }
}