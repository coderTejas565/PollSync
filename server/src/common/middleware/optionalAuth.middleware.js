import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const optionalAuthMiddleware = async(req,res,next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.userId
                }
            })
            req.user = user
        }
        next()
    } catch (error) {
        next()
    }
}