import mongoose, { Schema } from 'mongoose';

const productSchema=new mongoose.Schema({
    sku:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,        
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    stock:{
        type:Number,
        required:true,
        min:0
    },
    imageUrl:[{
        type:String,
        default:'',
        trim:true,
    }],
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    }
});

const Product = mongoose.model('product',productSchema);

module.exports = Product;