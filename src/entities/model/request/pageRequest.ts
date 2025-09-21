import type { Sorting } from ".";
import type { Paging } from ".";

export type PageRequest = {
    categoryIds?: string[];
    pagination: Paging;
    sorting: Sorting;
};