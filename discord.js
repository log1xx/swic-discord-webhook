const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const alertDefs = require('./alertDefs');
require('dotenv/config');

const wc = new discord.WebhookClient({ id: process.env.WEBHOOK_GUILD, token: process.env.WEBHOOK_TOKEN });

function postWebhook(title, description, url, image, wfo, alertStatus, event, locs, expire) {
    try {
        var expireFormat = new Date(expire);
        var content;
        var locsString = '[';

        for (i = 0; i < locs.length; i++) {
            if (i < locs.length - 1) {
                locsString = locsString + locs[i].county + ' ' + locs[i].state + ', ';
            } else {
                locsString = locsString + locs[i].county + ' ' + locs[i].state + ']';
            }
        }

        if (alertStatus == 'issues' || alertStatus == 'updates' || alertStatus == 'corrects' || alertStatus == 'continues') {
            content = wfo + " " + alertStatus + " " + title + " for " + locsString + " til " + expireFormat.toString().replace(/GMT.+\(/, '').replace(/\)/, '');
        } else {
            content = wfo + " " + alertStatus + " " + title + " for " + locsString;
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
