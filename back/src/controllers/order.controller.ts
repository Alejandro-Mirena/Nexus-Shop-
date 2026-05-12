import { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { catchedController } from "../utils/catchedController";
import { Order } from "../entities/Order";
import { AppDataSource } from "../config/dataSource";

export const createOrder = catchedController(
  async (req: Request, res: Response) => {
    const { products } = req.body;
    const userId = (req as any).user.id;
    const newOrder = await createOrderService({ userId, products });
    res
      .status(201)
      .json({
        id: newOrder.id,
        status: newOrder.status,
        date: newOrder.date,
        total: newOrder.total,
      });
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
      relations: ["orderDetails", "orderDetails.product"],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes" });
  }
};
