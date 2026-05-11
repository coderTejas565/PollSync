import bcrypt from "bcryptjs"
import prisma from "../../common/lib/prisma"
import { email } from "zod"

export const createUser = async({
    name,
    email,
    password
}) => {
    const existingUser = await prisma.user.findUnique({
        where:{
            email,
        }
    })
    if (existingUser) {
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })

    return user
}