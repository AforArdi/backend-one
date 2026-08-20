import { Router } from "express";
import { sendOtp, verifyOtp } from "./otp.controller.js";

const router: Router = Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

export default router;