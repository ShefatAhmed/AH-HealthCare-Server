import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { doctorScheduleServices } from "./doctorSchedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const user = req.user
    const result = await doctorScheduleServices.insertIntoDB(user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor schedule created successfully!",
        data: result
    })
})

export const doctorScheduleController = {
    insertIntoDB
}