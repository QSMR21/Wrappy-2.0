const mongoose = require('mongoose')


const giftSchema = new mongoose.Schema({
    file: {
        type: Buffer,
    },
    fileType: {
        type: String,
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

giftSchema.virtual('filePath').get(function () {
    if (this.file != null && this.fileType != null) {
        return `data:${this.fileType};charset=utf-8;base64,${this.file.toString('base64')}`
    }
})

module.exports = mongoose.model('Gift', giftSchema)
