import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isOauth:{
        type:Boolean,
        required:true
    }

},{
    timestamps: true
});

const user = mongoose.model("User",userSchema);
export default user;