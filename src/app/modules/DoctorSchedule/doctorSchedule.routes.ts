import express from "express"
import { doctorScheduleController } from "./doctorSchedule.controller";
const router = express.Router();

router.post("/", doctorScheduleController.insertIntoDB)

export const DoctorScheduleRoutes = router;