import { Router } from "express";
import * as categoryControllers from "../controllers/category.controller";
import * as subcategoryControllers from "../controllers/subcategory.controller";

const stockRouter = Router();

stockRouter.post("/category/add", categoryControllers.addCategoryController);

stockRouter.get(
  "/category/all",
  categoryControllers.fetchAllCategoriesController,
);
stockRouter.get(
  "/category/:id",
  categoryControllers.fetchSingleCategoryController,
);

stockRouter.put(
  "/category/update/:id",
  categoryControllers.updateCategoryController,
);

stockRouter.delete(
  "/category/delete/:id",
  categoryControllers.deleteCategoryController,
);

stockRouter.post(
  "/subcategory/add",
  subcategoryControllers.addSubcategoryController,
);

stockRouter.get(
  "/subcategory/all",
  subcategoryControllers.fetchAllSubcategoriesController,
);
stockRouter.get(
  "/subcategory/:id",
  subcategoryControllers.fetchSingleSubcategoryController,
);

stockRouter.put(
  "/subcategory/update/:id",
  subcategoryControllers.updateSubcategoryController,
);

stockRouter.delete(
  "/subcategory/delete/:id",
  subcategoryControllers.deleteSubcategoryController,
);

export default stockRouter;
