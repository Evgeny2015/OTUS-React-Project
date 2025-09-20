import { type FC } from "react"
import { useNavigate } from "react-router"
import { Alert, Button, Form, Input } from "antd"

import { APP_ROUTE, ProductApi } from "../../../app"
import type { ProductAddModel, ResponseError } from "../../../entities"
import { getError } from "../../../entities"


const ProductAdd: FC = () => {
    const [form] = Form.useForm()
    const navigator = useNavigate()
    const [rtkCreateProduct, response ] = ProductApi.useRtkCreateProductMutation()


    const handleSubmit = (editProduct: ProductAddModel) => {
        const newProduct: ProductAddModel = {
            name: editProduct.name,
            desc: editProduct.desc,
            price: editProduct.price,
            photo: editProduct.photo,
            categoryId: "68bc7bc78e877ac8a9c6a83e"
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

    return (
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                form={form}
                onFinish={(value) => handleSubmit(value)}
            >
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

