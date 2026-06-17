import { Router } from "express";
import arissRouter from "./ariss.route";
import customerRouter from "./customer.route";

const mainRouter = Router();

mainRouter.use("/ariss", arissRouter);
mainRouter.use("/customers", customerRouter);

export default mainRouter;
