const Canvas = require('@napi-rs/canvas');
const { MessageAttachment } = require('discord.js');
const { readFile } = require('fs/promises');


const profile = async (interaction) => {
    const canvas = Canvas.createCanvas(1280, 720);
    const context = canvas.getContext('2d');
    try {

        await interaction.deferReply();
        const backgroundFile = await readFile('./iu.jpg');
        const background = new Canvas.Image();
        background.src = backgroundFile;
    
        const iuFile = await readFile('./profile-image.jpg');
        const iuImage = new Canvas.Image();
        iuImage.src = iuFile;
    
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        context.drawImage(iuImage, 50, 50, iuImage.width, iuImage.height);
    
    
        const attachment = new MessageAttachment(canvas.toBuffer('image/png'), 'iu.png');
    
        interaction.editReply({ files: [attachment] });
        
    } catch (error) {
        console.log(error);
        await interaction.editReply('error');
    }
    
}

const hello = 'hello node';

module.exports = {
    profile,
    hello
}