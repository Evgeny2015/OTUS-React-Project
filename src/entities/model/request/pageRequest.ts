import type { Sorting } from ".";
import type { Paging } from ".";

export type PageRequest = {
    pagination: Paging;
    sorting: Sorting;
};