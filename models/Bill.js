const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);
