import express from "express"
import { prescriptionController } from "./prescription.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { PrescriptionValidation } from "./prescription.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    prescriptionController.getAllFromDB
);

router.get("/my-prescription", auth(UserRole.PATIENT), prescriptionController.patientPrescription)

router.post("/", auth(UserRole.DOCTOR),validateRequest(PrescriptionValidation.create), prescriptionController.insertIntoDB)


export const PrescriptionRoutes = router;