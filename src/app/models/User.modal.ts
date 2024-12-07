import mongoose,{Schema,Document} from "mongoose";

export interface User extends Document{
    firstname:string;
    lastname:string;
    username:string;
    email:string;
    password:string;
    address:string;
}

const UserSchema:Schema<User> = new Schema({
    firstname:{
        type:String,
        required:[true,"firstname is required"],
    },
    lastname:{
        type:String,
        required:[true,"lastname is required"],
    },
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,'please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    address:{
        type:String,
        required:[true,"address is required"]
    },
})

const UserModel = (mongoose.models.User as mongoose.Model<User>)|| mongoose.model<User>("User",UserSchema)

export default UserModel;