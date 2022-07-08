const wait = require('node:timers/promises').setTimeout;
const cheerio = require('cheerio');
const request = require('request');
const { link, linkSync } = require('node:fs');
const { url } = require('node:inspector');

const image = message => {

    let options = {
        // url: 'http://www.google.com/search?q=' + 'minecraft',
        url: 'https://www.google.com/search?q=%EC%95%84%EC%9D%B4%EC%9C%A0&source=lnms&tbm=isch&sa=X&',
        method: 'GET',
        header: {
            'Accept': 'text/html',
            'User-Agent': 'Chrome'
        }
    }

    try {
        request(options, (error, response, body) => {
            if (error) return;
    
            $ = cheerio.load(body);
    
            let links = $('.image a.link');
            if (links.length > 0) {
                let urls = new Array(links.length).fill(0).map( (v, i) => link.eq(i).attr('href') );
                console.log(urls);

                if (url.length < 1) {
                    console.log('url.length < 1');
                    return;
                }

                message.channel.send( urls[Math.floor(Math.random() * urls.length)] + ' '+ message.guild.members.randon() );
            }
            else {
                console.log('links.length < 1');
            }
        })
    
        
    } catch (error) {
        console.log(error);
        error = true;
    }
}

module.exports = {
    image
}


