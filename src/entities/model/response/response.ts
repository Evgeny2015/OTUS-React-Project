import type { Pagination, Sorting } from ".."


export type Response<T> = {
    data: T[];
    sorting: Sorting;
    pagination: Pagination;
}