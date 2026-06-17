import { Router } from "express";
import * as controller from "../controllers/ariss.controller";

const arissRouter = Router();

arissRouter.post("/user/sync", controller.syncUserController);

arissRouter.get("/users", controller.fetchAllArissUsersController);

arissRouter.delete("/user/delete/:id", controller.deleteUserController);

arissRouter.put("/user/approve/:id", controller.approveArissUserController);
arissRouter.put(
  "/user/disapprove/:id",
  controller.disapproveArissUserController,
);

export default arissRouter;
