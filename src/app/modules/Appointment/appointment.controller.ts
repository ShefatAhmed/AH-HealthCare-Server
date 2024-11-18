import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { AppointmentServices } from "./appointment.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";

const getMyAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user as IAuthUser;
    const filters = pick(req.query, ['status', 'paymentStatus']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AppointmentServices.getMyAppointment(user as IAuthUser, filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My appointment retrive successfully!",
        data: result
    })
})

const createAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user as IAuthUser;
    const result = await AppointmentServices.createAppointment(user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Appointment booked successfully!",
        data: result
    })
})

export const AppointmentController = {
    createAppointment,
    getMyAppointment
} 