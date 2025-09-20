import { type FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Alert, Button, Col, Form, Image, Input, Row } from "antd"
import { UploadOutlined } from '@ant-design/icons'

import { APP_ROUTE } from "../../../app"
import type { ProductEditModel, ProductUpdateModel, ResponseError } from "../../../entities"
import { getError, getProductUpdates } from "../../../entities"
import { ProductApi } from "../../../app"
import { Upload } from "../../../shared"


const ProductEditPage: FC = () => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const [editProduct, setEditProduct] = useState<ProductEditModel>({})
    const navigator = useNavigate()

    const [getProduct] = ProductApi.useRtkGetProductMutation()
    const [updateProduct, response] = ProductApi.useRtkUpdateProductMutation()
    const [uploadImage] = ProductApi.useRtkUploadImageMutation()

    useEffect(() => {
        if (!!id && id !== 'undefined') {
            getProduct(id)
                .then(x => {
                    const product = x.data
                    if (!!product)
                        setEditProduct({
                            name: product.name,
                            price: product.price,
                            desc: product.desc,
                            photo: product.photo
                        })
                    form.resetFields()
                })
        }
    }, [])

    const handleUpload = (file: File) => {
        if (!!id)
            uploadImage(file)
                .unwrap()
                .then(x => {
                    const update: ProductUpdateModel = {
                        id,
                        photo: x.url
                    }
                    updateProduct(update)
                        .unwrap()
                        .then(x => {
                            setEditProduct({ ...editProduct, photo: x.photo })
                        })
                })
                .catch(x => console.error(x))
    }

    const handleSaveProductSubmit = (data: ProductEditModel) => {
        const update = getProductUpdates(editProduct, data)

        if (!!id && !!update) {
            update.id = id
            updateProduct(update)
                .unwrap()
                .then(() => {
                    navigator(APP_ROUTE.root)
                })
                .catch(x => {
                    console.error(x)
                })
        }
    }

    return (
        <>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                form={form}
                onFinish={(value) => handleSaveProductSubmit(value)}
                initialValues={editProduct}
            >
                <Form.Item<ProductEditModel> label={null}>
                    <Row align='middle'>
                        <Image
                            height={150}
                            width={150}
                            src={editProduct.photo}
                        />
                        <Col
                            flex='auto'
                            style={{ textAlign: 'center' }}
                        >
                            <Button icon={<UploadOutlined />}>
                                <Upload accept='image/jpeg,image/png,image/webp' onUpload={handleUpload}>
                                    Загрузить
                                </Upload>
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item<ProductEditModel>
                    label='Название'
                    name='name'
                    rules={[
                        { required: true, message: 'Введите название продукта' },
                        { min: 3, message: 'Минимальная длина название должна быть 3 символа' }
                    ]}
                >
                    <Input placeholder='название продукта' />
                </Form.Item>

                <Form.Item<ProductEditModel>
                    label='Описание продукта'
                    name='desc'
                >
                    <Input placeholder='описание' />
                </Form.Item>

                <Form.Item<ProductEditModel>
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
        </>
    )
}

export default ProductEditPage