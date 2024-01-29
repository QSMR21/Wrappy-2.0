const mongoose = require('mongoose')

const giftSchema = new mongoose.Schema({
    file: {
        type: String,
        required: false
    },
    animation: {
        type: Number,
        required: true
    },
    receiver_name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    enveloppe_color: {
        type: String,
        required: true
    },
    sender_mail: {
        type: String,
        required: true
    },
    receiver_mail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Gift', giftSchema)