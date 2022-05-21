const express = require('express');
const { json } = require('express/lib/response');
const discord = require('../discord');
const router = express.Router();

router.post('/allAlerts', async (req, res) => {
    var alertStatus = '';

    switch (req.body.status) {
        case 'issued':
            alertStatus = 'issues';
            break;
        case 'updated':
            alertStatus = 'updates';
            break;
        case 'upgraded':
            alertStatus = 'upgrades';
            break;
        case 'corrected':
            alertStatus = 'corrects';
            break;
        case 'continued':
            alertStatus = 'continues';
            break;
        case 'cancelled':
            alertStatus = 'cancels';
            break;
        case 'expired':
            alertStatus = 'expires';
            break;
        default:
            req.body.status;
            break;
    };

    const sender = req.body.sender;
    const alertSender = sender.toUpperCase();
    
    try {
        discord.postWebhook(req.body.headline, '```' + req.body.desc + '```', req.body.web, req.body.image, alertSender, alertStatus, req.body.event, req.body.locs, req.body.expire);
        res.status(200).send({alert: "sent"});
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
});

module.exports = router;
