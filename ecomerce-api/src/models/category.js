import mongoose, { Schema } from 'mongoose';

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
        require:true,
        trim:true,
    },
    imageURL:{
        type:String,
        trim:true,
        default:'https://placehold.co/800x600.png',
    },
    parentCategory:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        default:null,
    }


});

const category = mongoose.model('category',categorySchema);

module.exports = category;