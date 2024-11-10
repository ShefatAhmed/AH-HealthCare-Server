import { Prisma, PrismaClient } from "@prisma/client";
import { adminSeacrhAbleFields } from "./admin.constant";

const prisma = new PrismaClient()

const calculatePagination = (options: {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
}) => {
    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * limit;

    const sortBy = options.sortBy || "createdAt"
    const sortOrder = options.sortOrder || "desc"

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

const getAllFromDB = async (params: any, options: any) => {
    const { page, limit, skip } = calculatePagination(options);
    const { searchTerm, ...fillterData } = params
    const andConditions: Prisma.AdminWhereInput[] = []
    if (params.searchTerm) {
        andConditions.push({
            OR: adminSeacrhAbleFields.map(field => ({
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
                    equals: fillterData[key]
                }
            }))
        })
    }
    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }
    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: "desc"
        }
    });
    return result
}

export const AdminService = {
    getAllFromDB
}