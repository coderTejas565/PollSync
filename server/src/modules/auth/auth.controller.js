import { createUser, loginUser } from "./auth.service";
import { signupSchema, loginSchema } from "./auth.validator";
import { generateToken } from "../../common/utils/generateToken";
import { success } from "zod";

export const signup = async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const user = await createUser(validatedData)
    
        res.status(201).json({
            success: true,
            user
        }) 
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }

}
