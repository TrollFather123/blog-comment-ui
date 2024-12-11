const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        reuired:[true,"Name is required"]
    },
    email:{
        type:String,
        reuired:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        reuired:[true,"Password is required"],
    },
    confirmPassword:{
        type:String,
        reuired:[true,"Consfirm Password is required"],
    }
},{
    timestamps:true
});



const User = mongoose.model("User",userSchema);

module.exports = User