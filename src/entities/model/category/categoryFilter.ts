import type { PageRequest } from "../request";

export const categoryFilter: PageRequest = {
  pagination: {
    pageNumber: 1,
    pageSize: 100
  },
  sorting: {
    type: 'ASC',
    field: 'name'
  }
}