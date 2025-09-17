import type { Pagination, Sorting } from ".."
import type { Product } from "."


export type ProductResponse = {
    data: Product[];
    sorting: Sorting;
    pagination: Pagination;
}