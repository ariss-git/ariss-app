import { Router } from "express";
import * as controllers from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.post("/sync", controllers.registerCustomerController);

customerRouter.get("/all", controllers.fetchAllCustomerController);

customerRouter.put(
  "/profile/complete/dealer",
  controllers.completeDealerProfileController,
);

export default customerRouter;
