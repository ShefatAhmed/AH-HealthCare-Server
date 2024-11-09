import express, { Request, Response, Router } from "express"
import { userController } from "./user.controller";
const router = express.Router();

router.get('/', userController.createAdmin)

export const userRoutes = router;