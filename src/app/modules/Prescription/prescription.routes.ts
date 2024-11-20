import express from "express"
import { prescriptionController } from "./prescription.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/my-prescription", auth(UserRole.PATIENT), prescriptionController.patientPrescription)
router.post("/", auth(UserRole.DOCTOR), prescriptionController.insertIntoDB)


export const PrescriptionRoutes = router;