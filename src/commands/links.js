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
                platforms.push({ name: link.platform, value: link.url })
            }
            const embed = new MessageEmbed()
                .setColor('#FF9D07')
                .setTitle(`${albumData.artist} - ${albumData.title}`)
                .setDescription(`Genero: ${albumData.genre}\nExplicito: ${albumData.explicitness}\nupc: ${albumData.upc}`)
                .setThumbnail(albumData.cover)
                .addFields(...platforms)
                .setTimestamp()
                .setFooter('Linkyn', 'https://cdn1.telesco.pe/file/P_8ud_q6ZOny8nt30uCsF5LXPZNnSut-MnbGzyktcpQabHwxCMQkKmhnERerlg6vKC_Az6nlvwLNLExddQGSioQgCv_UsuhMjjdcYalmFRuwNZ4tpZkSLccWKMkOLK_a27_M8l_E2zABAuQyBrk0BXLTmuDeTSP7rrhxCN5KE-8evxROgMP-q2uWjKXpzTo8hLbSjR4kCSzfhp5TbQlsea3fMKK7nnfIpoQsEEPScEQfFdMPP8mmvYkWewCBir1yT4iCKWmTYnaacoAuOSCNDxlP8aK3aRs41UBQOgUROgEr1wJBlAj2zdD0Vupdj1AEMrJxXqRsoYxai0EnJRR86w.jpg');
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(albumData.error.message);
        }
    }
}