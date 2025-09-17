import type { User } from "..";
import type { OrderProduct, OrderStatus } from "..";

export type Order = {
  id: string;
  products: OrderProduct[];
  user: User;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};