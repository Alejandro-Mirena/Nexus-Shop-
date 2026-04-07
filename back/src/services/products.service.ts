import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const getProductsService = async (
  categoryId?: number,
): Promise<Product[]> => {
  if (categoryId) {
    return await ProductRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: ["category"],
    });
  }

  return await ProductRepository.find({
    relations: ["category"],
  });
};

export const getProductByIdService = async (
  id: number,
): Promise<Product | null> => {
  return await ProductRepository.findOneBy({ id });
};

export const checkProductExists = async (
  productId: number,
): Promise<boolean> => {
  const product = await ProductRepository.findOneBy({ id: productId });
  return !!product;
};
