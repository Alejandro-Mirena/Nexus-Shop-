import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

// status: pending, approved, rejected

@Entity({ name: "orders" })
export class Order {
  static find(arg0: { where: { user: { id: any } } }) {
    throw new Error("Method not implemented.");
  }
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

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
