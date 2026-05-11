import { createUser, loginUser } from "./auth.service.js";
import { signupSchema, loginSchema } from "./auth.validator.js";
import { generateAccessToken, generateRefreshToken } from "../../common/utils/generateToken.js";
import { id } from "zod/v4/locales";
import { use } from "react";
import { email } from "zod";

export const signup = async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const user = await createUser(validatedData)
        
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAT: user.createdAt,
        }
    
        res.status(201).json({
            success: true,
            user: safeUser
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

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };


        res.status(200).json({
            success: true,
            accessToken,
            user: safeUser,
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message,
        })
    }
}