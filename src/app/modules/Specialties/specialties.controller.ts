import { Request, Response } from "express";
import httpStatus from "http-status";
import { SpecialtiesServices } from "./specialties.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesServices.insertIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesServices.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtiesServices.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});

export const SpecialtiesController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB
}