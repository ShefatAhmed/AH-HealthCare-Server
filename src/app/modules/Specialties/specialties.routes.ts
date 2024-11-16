import express, { NextFunction, Request, Response } from "express"
import { SpecialtiesController } from "./specialties.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
    '/',
    SpecialtiesController.getAllFromDB
);

router.post('/', fileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    return SpecialtiesController.insertIntoDB(req, res, next)
})

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    SpecialtiesController.deleteFromDB
);

export const SpecialtiesRoutes = router;