import { Prisma, PrismaClient } from "@prisma/client";
import { adminSeacrhAbleFields } from "./admin.constant";

const prisma = new PrismaClient()
const getAllFromDB = async (params: any) => {
    const {searchTerm, ...fillterData} = params
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
    if(Object.keys(fillterData).length > 0){
        andConditions.push({
            AND: Object.keys(fillterData).map(key=> ({
                [key] : {
                    equals: fillterData[key]
                }
            }))
        })
    }
    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }
    const result = await prisma.admin.findMany({
        where: whereConditions
    });
    return result
}

export const AdminService = {
    getAllFromDB
}