const express = require('express')
const router = express.Router()
const Gift = require('../models/gift')
const fileMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'application/pdf', 'text/plain'];

//Workshop Route
router.get('/', async (req, res) => {
    try {
        const gifts = await Gift.find({})
        res.render('workshop/index', { gifts: gifts })
    } catch {
        res.redirect('/')
    }
})

// Create Crafted Gift Route
router.post('/', (req, res) => {
    const gift = new Gift({
        animation: '1',
        receiver_name: req.body.receiver_name,
        message: req.body.message,
        signature: req.body.signature,
        enveloppe_color: req.body.enveloppe_color,
        sender_mail: req.body.sender_mail,
        receiver_mail: req.body.receiver_mail
    })
    saveFile(gift, req.body.file)

    gift.save()
        .then(() => {
            //  res.redirect(`workshop/${gift.id}`)
            res.render('gift/preview', { gift: gift })
        })
        .catch(() => {
            res.render('workshop/index', {
                gift: gift,
                errorMessage: 'Error creating your gift'
            })
        })
})

function saveFile(gift, fileEncoded) {
    if (fileEncoded == null) return
    const file = JSON.parse(fileEncoded)
    if (file != null && fileMimeTypes.includes(file.type)) {
        gift.file = new Buffer.from(file.data, 'base64')
        gift.fileType = file.type
    }
}

module.exports = router