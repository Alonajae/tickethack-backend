const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email:  String,
    password: String,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cart' }]
})

const User = mongoose.model('users', userSchema)

module.exports = User;