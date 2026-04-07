import { Router } from "express";
import { getProducts, getProductById } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

//TODO: agregar endpoint para traer todas las categorias sin los productos asociados
// router.get("/categories", getAllCategories);

export default router;
