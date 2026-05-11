import { createUser, loginUser } from "./auth.service.js";
import { signupSchema, loginSchema } from "./auth.validator.js";
import { generateAccessToken, generateRefreshToken } from "../../common/utils/generateToken.js";
import { id } from "zod/v4/locales";
import { email } from "zod";
import jwt from "jsonwebtoken";

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

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
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


export const refreshAccessToken = async(req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log(req.cookies);

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing"
            })
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        console.log(decoded);
        
        const accessToken = generateAccessToken(decoded.userId)

        res.status(200).json({
            success: true,
            accessToken
        })

        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid refresh token"
        })
    }
}

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};