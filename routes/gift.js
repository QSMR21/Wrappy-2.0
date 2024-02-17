const express = require('express')
const router = express.Router()
const Gift = require('../models/gift')

//Gift Route
router.get('/', (req, res) => {
    res.render('gift/index')
})

// router.get('/:id', (req, res) => {
//     res.send('gift' + req.params.id)
// })

router.get('/:id', async (req, res) => {
    try {
        const gift = await Gift.findById(req.params.id)
        res.render('gift/preview', {gift: gift})
    } catch {
        res.redirect('/')
    }
})


module.exports = router