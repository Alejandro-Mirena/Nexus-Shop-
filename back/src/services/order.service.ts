import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderDetail } from "../entities/OrderDetail";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";
import { AppDataSource } from "../config/dataSource";

export const createOrderService = async (
  createOrderDto: CreateOrderDto,
): Promise<Order> => {
  let total = 0;
  const orderDetails: OrderDetail[] = [];

  for await (const item of createOrderDto.products) {
    const product = await ProductRepository.findOneBy({ id: item.id });
    if (!product) throw new Error("Product not found");

    total += product.price * item.quantity;

    const detail = new OrderDetail();
    detail.quantity = item.quantity;
    detail.unitPrice = product.price;
    detail.product = product;

    orderDetails.push(detail);
  }

  const userF = await UserRepository.findOneBy({ id: createOrderDto.userId });
  if (!userF) throw new Error("User not found");

  const newOrder = OrderRepository.create();
  newOrder.status = "approved";
  newOrder.date = new Date();
  newOrder.user = userF;
  newOrder.total = total;

  await OrderRepository.save(newOrder); // 1️⃣ primero guarda la orden (genera el id)

  // 2️⃣ ahora asigna la orden a cada detalle y guárdalos
  const detailRepo = AppDataSource.getRepository(OrderDetail);
  for (const detail of orderDetails) {
    detail.order = newOrder; // 👈 esto setea el orderId en la DB
    await detailRepo.save(detail);
  }

  newOrder.orderDetails = orderDetails;
  return newOrder;
};
