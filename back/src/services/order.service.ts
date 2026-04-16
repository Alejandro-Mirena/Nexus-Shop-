import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";

export const createOrderService = async (
  createOrderDto: CreateOrderDto,
): Promise<Order> => {
  const productsF = [];

  let total = 0;

  for await (const item of createOrderDto.products) {
    const product = await ProductRepository.findOneBy({ id: item.id });

    if (!product) throw new Error("Product not found");

    // 🔥 calcular total real desde DB
    total += product.price * item.quantity;

    productsF.push(product);
  }

  const userF = await UserRepository.findOneBy({ id: createOrderDto.userId });
  if (!userF) throw new Error("User not found");

  const newOrder = OrderRepository.create();

  newOrder.status = "approved";
  newOrder.date = new Date();
  newOrder.user = userF;
  newOrder.products = productsF;
  newOrder.total = total;

  await OrderRepository.save(newOrder);
  return newOrder;
};
