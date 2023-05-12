const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userCartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    prodId: {
      type: String,
      required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date, default: new Date()
    },
    updatedAt: {
        type: Date, default: new Date()
    }
});

const userCart = mongoose.model('userCart', userCartSchema)

module.exports = userCart;