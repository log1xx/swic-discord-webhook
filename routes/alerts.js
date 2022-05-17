const express = require('express');
const discord = require('../discord');
const router = express.Router();

router.post('/allAlerts', async (req, res) => {
    switch (req.body.status) {
        case 'issued':
            const status = 'issues';
        default:
            req.body.status;
    };
    
    try {
        discord.postWebhook(req.body.headline, req.body.desc, req.body.web, req.body.image, req.body.sender, req.body.status);
        res.status(200).send({alert: "sent"});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
