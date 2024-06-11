import { Router } from "express";
import catchAsync from "../utils/asyncWrapper";
import { register, seedProductData } from "../controllers/auth/auth.controller";

const router = Router();

router.post("/register", catchAsync(register));

router.post("/seedProduct", catchAsync(seedProductData));

export default router;
