import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { ReviewServices } from "./review.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";
import { reviewFilterableFields } from "./review.contant";

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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, reviewFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await ReviewServices.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reviews retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const ReviewController = {
    insertIntoDB,
    getAllFromDB
};