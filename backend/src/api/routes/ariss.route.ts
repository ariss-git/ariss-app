import { Router } from "express";
import * as controller from "../controllers/ariss.controller";

const arissRouter = Router();

arissRouter.post("/user/sync", controller.syncUserController);

arissRouter.get("/users", controller.fetchAllArissUsersController);

arissRouter.delete("/user/delete/:id", controller.deleteUserController);

arissRouter.patch("/user/approve/:id", controller.approveArissUserController);
arissRouter.patch(
  "/user/disapprove/:id",
  controller.disapproveArissUserController,
);

export default arissRouter;
