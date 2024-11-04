import { Router } from "express";
import {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product-controller.js";

const router = Router();

// Define routes
router.route("/api/products").post(newProduct);
router.route("/api/get").get(getProducts);
router.route("/api/get/:id").get(getSingleProduct);
router.route("/api/update/:id").put(updateProduct);

export default router;
