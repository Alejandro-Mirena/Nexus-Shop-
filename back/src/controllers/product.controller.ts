import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getProductsService } from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  },
);

//TODO: agregar el filtrado de los productos por categoria, se puede hacer con un query param o con una ruta diferente, dependiendo de como se quiera implementar en el front
