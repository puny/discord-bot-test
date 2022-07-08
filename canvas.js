const Canvas = require('@napi-rs/canvas');
const { MessageAttachment } = require('discord.js');
const { readFile } = require('fs/promises');
const { request } = require('undici');

const profile = async (interaction) => {
    const canvas = Canvas.createCanvas(728, 484);
    const context = canvas.getContext('2d');
    try {

        // await interaction.deferReply();
        const backgroundFile = await readFile('./iu.jpg');
        const background = new Canvas.Image();
        background.src = backgroundFile;
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#5399ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
        context.strokeRect(2, 2, canvas.width-4, canvas.height-4);

        const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
        const avatar = new Canvas.Image();
        avatar.src = Buffer.from( await body.arrayBuffer() );
        context.drawImage(avatar, 400, 100, avatar.width, avatar.height );

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
    
        const iuFile = await readFile('./iu-profile.jpg');
        const iuImage = new Canvas.Image();
        iuImage.src = iuFile;
        context.drawImage(iuImage, 50, 50, iuImage.width, iuImage.height);
        
        const attachment = new MessageAttachment(canvas.toBuffer('image/png'), 'iu.png');
    
        interaction.reply({ files: [attachment] });
        
    } catch (error) {
        console.log(error);      
    }
    
}

module.exports = {
    profile
}