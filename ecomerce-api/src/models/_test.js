import mongoose from 'mongoose';

const cartSchema=new mongoose.Schema({


});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;