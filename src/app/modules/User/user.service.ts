import { UserRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import prisma from "../../../shared/prisma"

const createAdmin = async (data: any) => {
    const hashPassword: string = await bcrypt.hash(data.password, 12)
    const userData = {
        email: data.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async (transactonClient) => {
        await transactonClient.user.create({
            data: userData
        })
        const createAdminData = await transactonClient.admin.create({
            data: data.admin
        })
        return createAdminData
    })
    return result
}

export const userService = {
    createAdmin
}