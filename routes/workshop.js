const express = require('express')
const router = express.Router()
const Gift = require('../models/workshop')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


//Workshop Route
router.get('/', async (req, res) => {
    try{
        const gifts = await Gift.find({})
        res.render('workshop/index', { gifts: gifts })
    } catch {
        res.redirect('/')
    }
})

// Create Crafted Gift Route
router.post('/', upload.single('file'), (req, res) => {
    const gift = new Gift({
        file: req.file,
        animation: '1',
        receiver_name: req.body.receiver_name,
        message: req.body.message,
        signature: req.body.signature,
        enveloppe_color: req.body.enveloppe_color,
        sender_mail: req.body.sender_mail,
        receiver_mail: req.body.receiver_mail
    })
    gift.save()
        .then(() => {
          //  res.redirect(`workshop/${gift.id}`)
            res.redirect(`workshop`)
        })
        .catch( () => {
            res.render('workshop/index',{
                gift: gift,
                errorMessage: 'Error creating your gift'
            })
        })
})

module.exports = router