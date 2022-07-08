const axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const { create } = require('node:domain');
const wait = require('node:timers/promises').setTimeout;
const { buttons } = require('./button.js');

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const createButton = (r, c) => {
    let rows = [];
    for (i = 0; i < r; i++) {
        rows.push(new MessageActionRow());         
        for (j = 0; j < c; j++) {
            let id = 'id'+ String(i) + String(j);
            rows[i].addComponents(
                new MessageButton()
                    .setCustomId(id)
                    .setLabel('button'+ String(i) + String(j))
                    .setStyle('PRIMARY'),
            );
            console.log('button create id '+ id);
        }
    }
    return rows;
}

const imgur = async interaction => {
    try {
        img_list = [
            'https://imgur.com/x69CWbM',
            'https://imgur.com/HBWQgRN',
            'https://imgur.com/KFrxY10',
            'https://imgur.com/yeUn2An',
            'https://imgur.com/NQrs8kX',
            'https://imgur.com/RM2bYZC',
            'https://imgur.com/s4jiyHT'
          ]
        
        img_num = getRandomInt(0, 7);
        
        await interaction.reply('imgur image response...')
        await wait(2000);
        await interaction.editReply(img_list[img_num]);
        await wait(5000);
    
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY')
            );
        
        await interaction.editReply({ content: 'Button!!', components: [row]});
    } catch (error) {
        console.log(error);
    }
}

const button = async interaction => {
    try {
        // let rows = createButton(1, 1);
        const row = new MessageActionRow().addComponents(
            buttons.map( button => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setStyle(button.style);
            })
        )

        await interaction.reply({ content: 'Button!', ephemeral: true, components: [row] });

        const filter = i => {
            return buttons.filter(
                btn => btn.customId === i.customId
            )
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 10 * 1000
        })        

        collector.on('collect', async i => {
            const button = buttons.find(
                btn => btn.customId === i.customId
            )

            await button.func(i);
        });

        // 시간 초과가 됐을때 뭘 할지 정의
        collector.on('end', async collect => {
            console.log('버튼 시간 초과');
        });

    } catch(error) {
        console.log(error);
    }
}

const server = async interaction => {
    // await interaction.reply({ content: 'server command', ephemeral: true });
    await interaction.deferReply();
    await wait(60*1000);
    await interaction.editReply('서버 응답 결과!');
}

const api = async interaction => {

    // const options = {
    //     uri: 'https://face-api.aiafab.com/filterlist/',
    //     method: 'GET'
    // }
  

    // let message = ''
    // request(options, (err, response, body) => {
    //     console.log(response);
    //     message = response.message;
    // })

    // 파일 첨부
    const imglist = ['http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg',
                     'http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg',
                     'http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg'];
    // const img1 = new MessageAttachment('http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg');
    // const img2 = new MessageAttachment('http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg');
    // const img3 = new MessageAttachment('http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg');
    // imglist.push(img1, img2, img3);


    // const response = await axios.get('http://www.busan.com/nas/wcms/wcms_data/photos/2022/06/14/2022061410260748570_m.jpg');

    console.log('next step');
    await interaction.reply({ content: '\:cheese: :cheese:', files: imglist });
}


module.exports = {
    imgur,
    button,
    server,
    api
}