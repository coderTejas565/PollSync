import { createUser, loginUser } from "./auth.service.js";
import { signupSchema, loginSchema } from "./auth.validator.js";
import { generateToken } from "../../common/utils/generateToken.js";

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

export const login = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const user = await loginUser(validatedData);

        const token = generateToken(user.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message,
        })
    }
}