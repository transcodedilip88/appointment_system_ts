import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  phone:{
    contryCode:{
        type:String,
        default:'+1'
    },
    mobileNumber:{
        type:String,
        default:''
    }
  },
  role:{
    type:String,
    enum:['admin','patient'],
    default:'patient'
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  isBlocked:{
    type:Boolean,
    default:false
  },
  twoFactorAuthCode:{
    type:String,
    default:null
  }
},{timestamps:true}
);

export const userModel =  mongoose.model("patient", UserSchema);
