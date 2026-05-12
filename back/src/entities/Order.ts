import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { OrderDetail } from "./OrderDetail";

// status: pending, approved, rejected

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  date: Date;

  @Column({ type: "float", default: 0 })
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => OrderDetail, (detail) => detail.order, { cascade: true })
  orderDetails: OrderDetail[];
}
