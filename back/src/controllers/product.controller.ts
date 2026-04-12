import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  getProductByIdService,
  getProductsOnSaleService,
  getProductsService,
} from "../services/products.service";

import { getCategoriesService } from "../services/categories.service";

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

export const getAllCategories = catchedController(
  async (req: Request, res: Response) => {
    const categories = await getCategoriesService();
    res.json(categories);
  },
);
export const getProductsOnSale = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsOnSaleService();
    res.json(products);
  },
);
