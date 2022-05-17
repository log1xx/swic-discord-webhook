const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
require('dotenv/config');

const wc = new discord.WebhookClient({ id: '975773309490856009', token: 'jvT5K2S2CPCEBtL04cxIuwklMTr3GMMjqwYmwlS_XUvHViWY3scULAGI8CAWIWrGJ7Qi' });

function postWebhook(title, description, url, image, wfo, alertStatus) {
    const content = wfo + " " + alertStatus + " " + title;
    const alertEmbed = new MessageEmbed()
        .setColor('#000fff')
        .setTitle(title)
        .setURL(url)
        //.setImage(image)
        .setDescription(description);

        wc.send({content: content, embeds: [alertEmbed]});
}

module.exports = { postWebhook };
