const mongoose = require("mongoose")



const userSchema  = new mongoose.Schema({

    username:{type:String,required:true,min:3,max:20},

    
    password:{type:String,required:true,min:8},
    email:{type:String,unique:true,required:true,max:50},
    isAvtarSet:{type:Boolean,default:false},
    avatarImage:{type:String,default:""}



})


const userModel = mongoose.model("user",userSchema)

module.exports = userModel;



