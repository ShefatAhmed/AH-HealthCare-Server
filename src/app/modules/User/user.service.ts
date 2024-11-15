import { Admin, Doctor, Patient, Prisma, UserRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import prisma from "../../../shared/prisma"
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { UserSeacrhAbleFields } from "./user.constants";

const createAdmin = async (req: Request): Promise<Admin> => {
    const file = req.file as IFile;
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
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

const createDoctor = async (req: Request): Promise<Doctor> => {
    const file = req.file as IFile;
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashPassword: string = await bcrypt.hash(req.body.password, 12)
    const userData = {
        email: req.body.doctor.email,
        password: hashPassword,
        role: UserRole.DOCTOR
    }
    const result = await prisma.$transaction(async (transactonClient) => {
        await transactonClient.user.create({
            data: userData
        })
        const createDoctorData = await transactonClient.doctor.create({
            data: req.body.doctor
        })
        return createDoctorData
    })
    return result
}

const createPatient = async (req: Request): Promise<Patient> => {
    const file = req.file as IFile;
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
        req.body.patient.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashPassword: string = await bcrypt.hash(req.body.password, 12)
    const userData = {
        email: req.body.patient.email,
        password: hashPassword,
        role: UserRole.PATIENT
    }
    const result = await prisma.$transaction(async (transactonClient) => {
        await transactonClient.user.create({
            data: userData
        })
        const createPatientData = await transactonClient.patient.create({
            data: req.body.patient
        })
        return createPatientData
    })
    return result
}

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...fillterData } = params
    const andConditions: Prisma.UserWhereInput[] = []
    if (params.searchTerm) {
        andConditions.push({
            OR: UserSeacrhAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }
    if (Object.keys(fillterData).length > 0) {
        andConditions.push({
            AND: Object.keys(fillterData).map(key => ({
                [key]: {
                    equals: (fillterData as any)[key]
                }
            }))
        })
    }


    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: "desc"
        },
        select: {
            id: true,
            email: true,
            role: true,
            needPasswordChange: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            admin: true,
            patient: true,
            doctor: true
        }
    });
    const total = await prisma.user.count({
        where: whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const changeProfileStatus = async (id: string, status: UserRole) => {
    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });

    const updateUserStatus = await prisma.user.update({
        where: {
            id
        },
        data : status
    });

    return updateUserStatus;
};

export const userService = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllFromDB,
    changeProfileStatus
}