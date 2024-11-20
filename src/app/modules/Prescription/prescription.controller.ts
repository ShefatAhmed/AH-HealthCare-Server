import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { prescriptionServices } from "./prescription.service";
import { Request, Response } from "express";
import { IAuthUser } from "../../interfaces/common";

const insertIntoDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await prescriptionServices.insertIntoDB(user as IAuthUser, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Prescription created successfully',
        data: result,
    });
});

export const prescriptionController = {
    insertIntoDB
}