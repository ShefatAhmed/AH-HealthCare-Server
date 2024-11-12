import { NextFunction, Request, RequestHandler, Response } from "express"
import { AdminService } from "./admin.service"
import pick from "../../../shared/pick"
import { adminFilterableFields } from "./admin.constant"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"

const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
    const filters = pick(req.query, adminFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await AdminService.getAllFromDB(filters, options)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data fetched!",
        meta: result.meta,
        data: result.data
    })
})

const getByIdFromDB: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data fetched by id!",
        data: result
    })
})

const updateIntoDB: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data updated!",
        data: result
    })
})

const deleteFromDB: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data deleted!",
        data: result
    })
})

const softDeleteFromDB: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data deleted!",
        data: result
    })
})

export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}