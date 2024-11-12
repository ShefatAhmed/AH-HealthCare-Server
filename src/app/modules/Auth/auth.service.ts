import { jwtHelpers } from "../../../helpers/jwtHelper";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt"

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

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({ email: payload.email, password: payload.password }, "abcdefgh", "5m")

    const refreshToken = jwtHelpers.generateToken({ email: payload.email, password: payload.password }, "abcdefghijklmnop", "30d")
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
}

export const AuthService = {
    loginUser
}