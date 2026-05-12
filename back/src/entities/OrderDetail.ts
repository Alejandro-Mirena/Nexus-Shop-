import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity({ name: "order_details" })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: "float" })
  unitPrice: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: "orderId" })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "productId" })
  product: Product;
}
