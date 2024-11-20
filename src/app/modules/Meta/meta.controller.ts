import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { MetaServices } from "./meta.service";
import { IAuthUser } from "../../interfaces/common";

const fetchDashboardMetaData = catchAsync(async (req: Request & {user?:IAuthUser }, res: Response) => {
    const user = req.user
    const result = await MetaServices.fetchDashboardMetaData(user as IAuthUser);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Meta data retrival successfully',
        data: result,
    });
});


export const MetaController = {
    fetchDashboardMetaData
}