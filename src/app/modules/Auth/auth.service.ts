import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const loginUser = async (payload: {
    email: string;
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password)

    if(!isCorrectPassword){
        throw new Error("Password incorrect!")
    }
    const accessToken = jwt.sign({
        email: userData.email,
        password: userData.password
    }, 'abcdefg', {
        algorithm: "HS256",
        expiresIn: "5m"
    })

    const refreshToken = jwt.sign({
        email: userData.email,
        password: userData.password
    }, 'abcdefgh', {
        algorithm: "HS256",
        expiresIn: "30d"
    })
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
}

export const AuthService = {
    loginUser
}