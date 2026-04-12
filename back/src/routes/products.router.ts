import { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductsOnSale,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/onsale", getProductsOnSale);
router.get("/:id", getProductById);

export default router;
