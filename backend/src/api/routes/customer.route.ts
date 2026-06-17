import { Router } from "express";
import * as controllers from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.post(
  "/profile/complete/dealer",
  controllers.registerDealerController,
);

export default customerRouter;
