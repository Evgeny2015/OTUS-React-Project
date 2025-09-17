import type { Order, Pagination, Sorting } from "..";

export type OrderResponse = {
    data: Order[],
    pagination: Pagination,
    sorting: Sorting
}