import type { Product } from "../product";

export type BasketProductModel = Pick<Product, "id" | "photo" | "name" | "price"> & { quantity: number };

export function GetBasketFromProduct(prod: Product): BasketProductModel {
  return {
    id: prod.id,
    photo: prod.photo,
    name: prod.name,
    price: prod.price,
    quantity: 1
  }
}


export function GetBasketFromProducts(prod: Product[]): BasketProductModel[] {
  return prod.map<BasketProductModel>(x => GetBasketFromProduct(x))
}
