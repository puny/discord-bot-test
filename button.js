const { MessageActionRow, MessageButton, MessageEmbed, Message } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const buttons = [
    {
        customId: "cid",
        label: "buttonLabel",
        style: "PRIMARY",
        async func(interaction) {
            await interaction.reply('button click!!');
        }
    }
];

const root = interaction => {    
    try {
        // message = new Message();
        // const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

        // collector.on('collect', i => {
        //     if (i.user.id === interaction.user.id)
        //         i.reply(`${i.user.id} clicked on the ${i.customId} button.`)
        //     else
        //         i.reply({ content: `These buttons arent' for you!`, ephemeral: true});
        // });


        const collector = interaction.channel.createMessageCollector({ time: 3000 });
        
        collector.on('collect', interaction => {
            if (interaction.customId === 'id00') {
                // await i.deferUpdate();
                // await wait(4000);
                // await i.editReply({ content: 'A button was clicked', components: [] });
                console.log('collect event !!');
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        })

    } catch (error) {
        console.log(error);
    }    
}

module.exports = {
    root,
    buttons
}