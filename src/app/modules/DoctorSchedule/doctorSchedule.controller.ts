import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    
})

export const doctorScheduleController = {
    insertIntoDB
}