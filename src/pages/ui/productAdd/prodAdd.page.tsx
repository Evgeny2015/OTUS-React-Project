import { useEffect, type FC } from "react"
import { useNavigate } from "react-router"
import { Alert, Button, Form, Input } from "antd"

import { APP_ROUTE, CategoryApi, ProductApi } from "../../../app"
import type { ProductAddModel, ResponseError } from "../../../entities"
import { categoryFilter, getError } from "../../../entities"
import { CategorySelector } from "../../../shared"


let selectedCategoryId: string | null = null

const ProductAdd: FC = () => {
    const [form] = Form.useForm()
    const navigator = useNavigate()
    const categoryGet = CategoryApi.useRtkGetCategorysQuery(categoryFilter)
    const categories = categoryGet.data
    const [rtkCreateProduct, response] = ProductApi.useRtkCreateProductMutation()

    useEffect(() => {
        selectedCategoryId = null
    }, [])


    const handleSubmit = (editProduct: ProductAddModel) => {
        if (!selectedCategoryId)
            return

        const newProduct: ProductAddModel = {
            name: editProduct.name,
            desc: editProduct.desc,
            price: editProduct.price,
            photo: editProduct.photo,
            categoryId: selectedCategoryId
        }

        rtkCreateProduct(newProduct)
            .unwrap()
            .then(() => {
                navigator(APP_ROUTE.root)
            })
            .catch(x => {
                console.error(x)
            })
    }

    const handleChangeCategory = (selected: string | string[]) => {
        console.debug('sel ==', selected)
        if (!Array.isArray(selected))
            selectedCategoryId = selected
    }


    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            form={form}
            onFinish={(value) => handleSubmit(value)}
        >
            <Form.Item<ProductAddModel> label={null}>
                <CategorySelector
                    options={categories?.data.map(x => ({ label: x.name, value: x.id })) ?? []}
                    defaults={(categories && categories.data.length > 0) ? [categories?.data[0].name] : []}
                    onChange={handleChangeCategory}
                    multiple={false}
                />

            </Form.Item>

            <Form.Item<ProductAddModel>
                label='Название'
                name='name'
                rules={[
                    { required: true, message: 'Введите название продукта' },
                    { min: 3, message: 'Минимальная длина название должна быть 3 символа' }
                ]}
            >
                <Input placeholder='название продукта' />
            </Form.Item>

            <Form.Item<ProductAddModel>
                label='Описание продукта'
                name='desc'
            >
                <Input placeholder='описание' />
            </Form.Item>

            <Form.Item<ProductAddModel>
                label='Цена'
                name='price'
                rules={[
                    { required: true, message: 'Введите цену' },
                    () => ({
                        validator(_, value) {
                            if (Number(value) > 0)
                                return Promise.resolve()

                            return Promise.reject(new Error('Минимальная цена 1р'))
                        }
                    }),
                ]}

            >
                <Input placeholder='цена' />
            </Form.Item>

            {response.isError &&
                <Alert message={getError(response.error as ResponseError)} type='error' style={{ marginBottom: 20 }} />
            }
            <Form.Item label={null}>
                <Button type='primary' htmlType='submit'>
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProductAdd

