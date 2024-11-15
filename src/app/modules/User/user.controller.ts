import { Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { UserFilterableFields } from "./user.constants";
import pick from "../../../shared/pick";

const createAdmin = catchAsync(async (req: Request, res: Response, next?: unknown) => {
    const result = await userService.createAdmin(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin created successfully!",
        data: result
    })
})

const createDoctor = catchAsync(async (req: Request, res: Response, next?: unknown) => {
    const result = await userService.createDoctor(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor created successfully!",
        data: result
    })
})

const createPatient = catchAsync(async (req: Request, res: Response, next?: unknown) => {
    const result = await userService.createPatient(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
    const filters = pick(req.query, UserFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await userService.getAllFromDB(filters, options)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User data fetched!",
        meta: result.meta,
        data: result.data
    })
})

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await userService.getMyProfile(user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fethced!",
        data: result
    })
})

export const userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllFromDB,
    changeProfileStatus,
    getMyProfile
}