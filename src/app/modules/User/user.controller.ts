import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response, next?: unknown) => {
    const result = await userService.createAdmin(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin created successfully!",
        data: result
    })
})

const createDoctor = async (req: Request, res: Response, next?: unknown) => {
    const result = await userService.createDoctor(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor created successfully!",
        data: result
    })
}

export const userController = {
    createAdmin,
    createDoctor
}