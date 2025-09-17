import type { OrderAddModel } from "..";

export type OrderUpdateModel = { id: string } &
    Partial<OrderAddModel>