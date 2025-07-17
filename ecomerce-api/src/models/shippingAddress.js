import mongoose from 'mongoose';
//const Schema=mongoose
const shippingAddressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    address:{},
    city:{},
    state:{},
    postalCode:{},

   
});

const shippingAddress = mongoose.model('shippingAddress',shippingAddressSchema);

module.exports = shippingAddress;