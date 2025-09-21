import type { OrderStatus } from "../model"

export const getOrderStatus: (status: OrderStatus) => string = (status) => {
    switch (status) {
        case 'pending_confirmation':
            return 'ожидание подтверждения'

        case 'processing':
            return 'обработка'

        case 'packaging':
            return 'упаковка'

        case 'waiting_for_delivery':
            return 'ожидание доставки';

        case 'in_transit':
            return 'в пути';

        case 'delivered':
            return 'доставлено'

        case 'return_requested':
            return 'возврат'

        case 'order_cancelled':
            return 'отменен'

        default:
            return 'error'
    }
}