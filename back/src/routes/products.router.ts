import { Router } from "express";
import { getProducts } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);

//TODO: el filtrado de los productos por categoria deberia ir en el front o en el backend
//  router.get("/products/:categoryId", getProductsbyCategory);

//TODO: agregar endpoint para traer todas las categorias sin los productos asociados
// router.get("/categories", getAllCategories);

export default router;
