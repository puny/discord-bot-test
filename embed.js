const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const info = async interaction => {

    try {
        // const components = new MessageActionRow()
        //     .addComponents(
        //         new MessageButton()
        //             .setCustomId('btn1')
        //             .setLabel('embed MessageButon')
        //             .setStyle('PRIMARY')
        //     )
        
        // const embed1 = new MessageEmbed()
        //     .setColor('#0099ff')
        //     .setTitle('Some title')
        //     .setURL('https://discord.js.ord')
        //     .setDescription('Some description here');

        const embed1 = new MessageEmbed()
            .setImage('http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg');

        const embed2 = new MessageEmbed()
            .setImage('http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg');

        // await interaction.deferReply('처리하는중...');
        // await wait(4 * 1000);

        await interaction.reply( {content: 'Embed!', ephemeral: true, embeds: [embed1, embed2] } );
    } catch(e) {
        console.log(e);
    };
}

module.exports = {
    info
}