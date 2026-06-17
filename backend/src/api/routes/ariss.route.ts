import { Router } from "express";
import * as controller from "../controllers/ariss.controller";

const arissRouter = Router();

arissRouter.post("/user/sync", controller.syncUserController);

export default arissRouter;
