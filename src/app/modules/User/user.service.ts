import { UserRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import prisma from "../../../shared/prisma"
import { fileUploader } from "../../../helpers/fileUploader";

const createAdmin = async (req: any) => {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
        console.log(req.body);
    }
    const hashPassword: string = await bcrypt.hash(req.body.password, 12)
    const userData = {
        email: req.body.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async (transactonClient) => {
        await transactonClient.user.create({
            data: userData
        })
        const createAdminData = await transactonClient.admin.create({
            data: req.body.admin
        })
        return createAdminData
    })
    return result
}

export const userService = {
    createAdmin
}