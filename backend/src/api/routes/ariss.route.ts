import { Router } from "express";
import * as controller from "../controllers/ariss.controller";

const arissRouter = Router();

arissRouter.post("/user/sync", controller.syncUserController);

arissRouter.get("/users", controller.fetchAllArissUsersController);

export default arissRouter;
