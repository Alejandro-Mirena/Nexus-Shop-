import { Router } from "express";
import validateOrderCreate from "../middlewares/orderCreate.middleware";
import { createOrder, getOrders } from "../controllers/order.controller";
import checkLogin from "../middlewares/checkLogin.middleware";

const ordersRouter = Router();

ordersRouter.post("/", checkLogin, validateOrderCreate, createOrder);
ordersRouter.get("/", checkLogin, getOrders);

export default ordersRouter;
