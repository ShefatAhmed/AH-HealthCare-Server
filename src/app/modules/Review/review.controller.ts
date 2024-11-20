import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { ReviewServices } from "./review.service";
import { IAuthUser } from "../../interfaces/common";

const insertIntoDB = catchAsync(async (req: Request & {user?: IAuthUser}, res: Response) => {
    const user = req.user
    const result = await ReviewServices.insertIntoDB(user as IAuthUser, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review created successfully',
        data: result
    });
});

export const ReviewController = {
    insertIntoDB
};