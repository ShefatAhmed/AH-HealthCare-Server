import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { doctorScheduleServices } from "./doctorSchedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";
import { scheduleFilterableFields } from "./doctorSchedule.constants";

const insertIntoDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await doctorScheduleServices.insertIntoDB(user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor schedule created successfully!",
        data: result
    })
})

const getMySchedule = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ['startDate', 'endDate', 'isBooked']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const user = req.user;
    const result = await doctorScheduleServices.getMySchedule(filters, options, user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Schedule fetched successfully!",
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;
    const { id } = req.params;
    const result = await doctorScheduleServices.deleteFromDB(user as IAuthUser, id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My Schedule deleted successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, scheduleFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await doctorScheduleServices.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Doctor Schedule retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const doctorScheduleController = {
    insertIntoDB,
    getMySchedule,
    deleteFromDB,
    getAllFromDB
}