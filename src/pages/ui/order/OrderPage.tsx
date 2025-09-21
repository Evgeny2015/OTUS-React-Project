import { Button, Card, Table } from "antd"
import { type FC, useEffect, useState } from "react"
import type { Order } from "../../../entities"
import { OrderApi } from "../../../app"
import './OrderPage.css'
import { OrderStatusItem } from "../../../shared"

// Описание колонок в таблице товаров для заказа
const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Цена',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Кол-во',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Итого',
        dataIndex: 'total',
        key: 'total',
    },
];


const OrderPage: FC = () => {
    const [getOrders] = OrderApi.useRtkGetOrdersMutation()
    const [deleteOrder] = OrderApi.useRtkDeleteProductMutation()
    const [orders, setOrders] = useState<Order[]>([])

    // Загружаем заказы
    const loadOrders = () => {
        getOrders(
            {
                pagination: {
                    pageSize: 100,
                    pageNumber: 1
                },
                sorting: {
                    type: 'ASC',
                    field: 'name'
                }
            }
        )
            .then(x => {
                if (x.data)
                    setOrders(x.data.data)
            })
    }

    // Первая загрузка компонента
    useEffect(() => {
        loadOrders()
    }, [])

    const handleCancelOrder = (id: string) => {
        deleteOrder(id)
            .unwrap()
            .then(_ => loadOrders())
            .catch()
    }

    return (
        <>
            {((orders.length === 0)) ?
                <div>Нет заказов</div> :
                <div className="orders">
                    {
                        orders.map(x => (
                            <Card
                                key={x.id}
                                title={<>Заказ ${x.createdAt} <OrderStatusItem status={x.status} /></>}
                                style={{ margin: 5 }}
                                extra={
                                    <Button color="primary" variant="outlined" size="small"
                                        onClick={() => handleCancelOrder(x.id)}>
                                        Отменить
                                    </Button>}
                            >
                                <Table
                                    dataSource={x.products.map(x => {
                                        return {
                                            key: x._id,
                                            name: x.product.name,
                                            price: x.product.price,
                                            quantity: x.quantity,
                                            total: x.product.price * x.quantity
                                        }
                                    })}
                                    columns={columns}
                                    pagination={false}
                                    summary={() => {
                                        const total = x.products.map(x => x.product.price*x.quantity).reduce((a, x) => a + x, 0)
                                        return (
                                            <Table.Summary fixed>
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={3}>{total}</Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            </Table.Summary>
                                        )
                                    }}
                                />
                            </Card>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default OrderPage