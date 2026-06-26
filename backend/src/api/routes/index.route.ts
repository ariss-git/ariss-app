import { Router } from "express";
import arissRouter from "./ariss.route";
import customerRouter from "./customer.route";
import stockRouter from "./stock.route";

const mainRouter = Router();

mainRouter.use("/ariss", arissRouter);
mainRouter.use("/customers", customerRouter);
mainRouter.use("/stock", stockRouter);

export default mainRouter;
