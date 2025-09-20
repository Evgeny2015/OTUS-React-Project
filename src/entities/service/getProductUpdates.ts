import type { ProductEditModel, ProductUpdateModel } from "../model"

// Возвращает только измененные поля
export const getProductUpdates = (product: ProductEditModel, edit: ProductEditModel): ProductUpdateModel | null =>
{
    const fields = new Map<string, ProductUpdateModel[keyof ProductUpdateModel]>()

    Object.entries(edit).map(x => {
        const [key, value] = x
        const source = product[key as keyof ProductEditModel]
        if (source !== value) {
            fields.set(key, value)
        }
    })

    return (fields.size > 0) ?
        Object.assign({}, ...Array.from(fields, ([key, value]) => ({ [key]: value }))) :
        null
}