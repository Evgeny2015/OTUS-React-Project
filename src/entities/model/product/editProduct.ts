import type { Product } from ".";

export type ProductEditModel = Partial<Pick<Product, 'name' | 'desc' | 'price' | 'photo'>>
