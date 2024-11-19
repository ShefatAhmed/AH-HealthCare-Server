import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { PaymentServices } from "./payment.service";
import { Request, Response } from "express";

const initPayment = catchAsync(async (req: Request, res: Response) => {
    const {appointmentId} = req.params
    const result = await PaymentServices.initPayment(appointmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment initiate successfully',
        data: result,
    });
});


export const PaymentController = {
    initPayment
}