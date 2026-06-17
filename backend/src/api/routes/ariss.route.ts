import { Router } from "express";
import * as controller from "../controllers/ariss.controller";

const arissRouter = Router();

arissRouter.post("/user/sync", controller.syncUserController);

arissRouter.get("/users", controller.fetchAllArissUsersController);

arissRouter.delete("/user/delete/:id", controller.deleteUserController);

export default arissRouter;
