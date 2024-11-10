import { Prisma } from "@prisma/client";
import { adminSeacrhAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";



const getAllFromDB = async (params: any, options: any) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
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