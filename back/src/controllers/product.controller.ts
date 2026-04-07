import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  getProductByIdService,
  getProductsService,
} from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const { categoryId } = req.query;

    const products = await getProductsService(
      categoryId ? Number(categoryId) : undefined,
    );

    res.json(products);
  },
);
export const getProductById = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await getProductByIdService(Number(id));

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    res.json(product);
  },
);

//TODO: agregar el filtrado de los productos por categoria, se puede hacer con un query param o con una ruta diferente, dependiendo de como se quiera implementar en el front
