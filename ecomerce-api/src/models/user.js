import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    displayName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Por favor ingresa un email válido'
    ]
    },
    hashPasword:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true,
        enum:['admin','customer','guest']
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        max:10
    },
    avatar:{
        type:String,
        required:true,
        trim:true,
        default:'https://placehold.co/800x600.png'
    },
    isActive:{
        type:Boolean,
        default:true
    }


});

const User = mongoose.model('user',userSchema);

module.exports = User;