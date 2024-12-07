import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User.modal";
import bcrypt from "bcryptjs";

export async function POST(request:Request) {
    await dbConnect()

    try {
        const {firstname,lastname,username,email,password,address }= await request.json()
        const existingUsername = await UserModel.findOne({
            username,
        })

        if(existingUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
       },
       {
         status:400
       }
        )
        }
        const existingUserByemail = await UserModel.findOne({email})
        if(existingUserByemail){
          return Response.json({
            success:false,
            message:"User already exist with this email"
          },{status:400})
        }
        else{
            const hasedPassword =  await bcrypt.hash(password,10);
            const newUser = new UserModel({
                firstname,
                lastname,
                username,
                email,
                password:hasedPassword,
                address,
            })
            await newUser.save()
        }


    } catch (error) {
        console.error('error registering user',error)
        return Response.json( 
            {
                success:false,
                message:"Error registering user"
            },
            {
                status:500
            }
        )
    }
}