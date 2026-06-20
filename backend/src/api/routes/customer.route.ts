import { Router } from "express";
import * as controllers from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.post("/sync", controllers.registerCustomerController);

customerRouter.get("/all", controllers.fetchAllCustomerController);
customerRouter.get("/:id", controllers.fetchSingleCustomerController);

customerRouter.put(
  "/profile/complete/dealer/:id",
  controllers.completeDealerProfileController,
);
customerRouter.put(
  "/profile/complete/employee/:id",
  controllers.completeEmployeeProfileController,
);

customerRouter.patch(
  "/profile/approve/:id",
  controllers.approveCustomerController,
);
customerRouter.patch(
  "/profile/disapprove/:id",
  controllers.disapproveCustomerController,
);

customerRouter.delete(
  "/profile/delete/:id",
  controllers.deleteCustomerController,
);

export default customerRouter;
