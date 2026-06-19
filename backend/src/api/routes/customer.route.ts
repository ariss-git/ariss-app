import { Router } from "express";
import * as controllers from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.post(
  "/profile/complete/dealer",
  controllers.completeDealerProfileController,
);

export default customerRouter;
