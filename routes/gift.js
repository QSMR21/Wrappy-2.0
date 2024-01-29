const express = require('express')
const router = express.Router()
const Gift = require('../models/gift')


//Gift Route
router.get('/', (req, res) => {
    res.render('gift/index')
})

module.exports = router