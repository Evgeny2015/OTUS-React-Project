import type { Product } from ".";

export type ProductUpdateModel = Pick<Product, 'id'> & Partial<Pick<Product, 'name' | 'desc' | 'price' | 'photo'>>

