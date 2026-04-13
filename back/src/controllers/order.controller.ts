import { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { catchedController } from "../utils/catchedController";
import { Order } from "../entities/Order";
import { AppDataSource } from "../config/dataSource";

export const createOrder = catchedController(
  async (req: Request, res: Response) => {
    const { products } = req.body;
    const userId = req.body.userId;
    const newOrder = await createOrderService({ userId, products });
    res.send(newOrder);
  },
);
export const getOrders = async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const orderRepository = AppDataSource.getRepository(Order);

    const orders = await orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ["user", "products"],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes" });
  }
};
