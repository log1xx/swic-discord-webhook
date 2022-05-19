const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const alertDefs = require('./alertDefs');
require('dotenv/config');

const wc = new discord.WebhookClient({ id: process.env.WEBHOOK_GUILD, token: process.env.WEBHOOK_TOKEN });

function postWebhook(title, description, url, image, wfo, alertStatus, event) {
    try {
        const content = wfo + " " + alertStatus + " " + title;
        const alertEmbed = new MessageEmbed()
            .setColor(alertDefs.alertDefColors(event))
            .setTitle(title)
            .setURL(url)
            //.setImage(image)
            .setDescription(description);
    
            wc.send({content: content, embeds: [alertEmbed]});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postWebhook };
