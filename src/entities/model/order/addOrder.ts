import type { Order, OrderStatus } from "..";

export type OrderProdAddModel = Pick<Order, 'id'> & { quantity: number}

export type OrderAddModel =
{
    products: OrderProdAddModel[],
    status?: OrderStatus
}

