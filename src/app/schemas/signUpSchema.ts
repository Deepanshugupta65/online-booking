import {z} from 'zod';


// it cheeck only one field i.e username
export const usernameValidation = z
      .string()
      .min(2,"Username must be atleast 2 character")
      .max(20,"Username must be no more then 20 character")
      .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")

    //   using object for multiple field
 export const signUpSchema = z.object({
    firstname:z.string().min(2,{message:"firstname must be atleast 2 char"}),
    lastname:z.string().min(2,{message:"lastname must be atleast 2 character"}),
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"password must be at least 6 char"}),
    address:z.string().min(3,{message:"address must be atleast 3 character"})
 })     