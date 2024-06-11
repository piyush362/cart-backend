import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

// create a new router object
const routerV1 = Router();

routerV1.use("/auth", authRoutes);

routerV1.use("/user", userRoutes);

export default routerV1;
