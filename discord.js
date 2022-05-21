const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const alertDefs = require('./alertDefs');
require('dotenv/config');

const wc = new discord.WebhookClient({ id: process.env.WEBHOOK_GUILD, token: process.env.WEBHOOK_TOKEN });

function postWebhook(title, description, url, image, wfo, alertStatus, event, locs, expire) {
    try {
        var expireFormat = new Date(expire);
        var content;

        if (alertStatus == 'issues' || alertStatus == 'updates') {
            content = wfo + " " + alertStatus + " " + title + " for " + locs + " til " + expireFormat.toLocaleString() + " UTC";
        } else {
            content = wfo + " " + alertStatus + " " + title + " for " + locs;
        }
        
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
