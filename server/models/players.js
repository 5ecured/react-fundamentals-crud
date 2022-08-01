const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: String,
    club: String,
    important: Boolean
})

module.exports = mongoose.model('Player', playerSchema)