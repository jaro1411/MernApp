const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('Document', documentSchema)