import { Router } from "express";
import arissRouter from "./ariss.route";

const mainRouter = Router();

mainRouter.use("/ariss", arissRouter);

export default mainRouter;
