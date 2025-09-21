import { Tag } from "antd";
import type { FC } from "react";
import { getOrderStatus, type OrderStatus } from "../../../entities";

type OrderStatusProps = {
    status: OrderStatus
}

const OrderStatusItem: FC<OrderStatusProps> = ({status}) => {
    return (
        <Tag  color="cyan">
            {getOrderStatus(status)}
        </Tag>
    )
}

export default OrderStatusItem