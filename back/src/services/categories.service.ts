import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../entities/Category";

export const getCategoriesService = async (): Promise<Category[]> => {
  return await CategoryRepository.find({ select: ["id", "name"] });
};
