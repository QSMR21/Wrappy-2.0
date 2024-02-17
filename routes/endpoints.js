const express = require('express')
const router = express.Router()
const Gift = require('../models/gift')


router.get('/api/gift/:id', async (req, res) => {
    try {
        const gift = await Gift.findById(req.params.id);
        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }
        res.json({ enveloppe_color: gift.enveloppe_color });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router