import { type FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Alert, Button } from "antd"

import type { BasketProductModel, OrderAddModel } from "../../../entities"
import { type ResponseError, getError } from "../../../entities"

import { APP_ROUTE, OrderApi } from "../../../app"
import { BasketItem } from "../../../shared"
import { basketActions, basketSelectors } from "../../../app/store"


const BasketPage: FC = () => {
  const basket = useSelector(basketSelectors.get)
  const dispatcher = useDispatch()
  const [prodInBasket, setProdInBasket] = useState<BasketProductModel[]>([])
  const navigator = useNavigate()
  const [createOrder, response] = OrderApi.useRtkCreateOrderMutation()


  useEffect(() => {
    if (basket === null) {
      return
    }
    setProdInBasket(basket)
  }, [basket])

  // удаляем товар из корзины
  const handleRemoveItem = (id: BasketProductModel["id"]) => {
    dispatcher(basketActions.remove(id))
  }

  // создаем новый заказ
  const handleCreateOrder = () => {

    const order: OrderAddModel = {
      products: prodInBasket.map(x => { return { id: x.id, quantity: x.quantity } })
    }

    createOrder(order)
      .unwrap()
      .then(() => {
        navigator(APP_ROUTE.order)
      })
      .catch(x => {
        console.error(x)
      })
  }

  const handleChangeQuantity = (item: BasketProductModel, quantity: number) => {
    dispatcher(basketActions.setQuantity({id: item.id, quantity}))
  }

  return (
    <div>
      {(prodInBasket.length == 0) ?
        <div>Корзина пуста</div> :
        <div>
          <div className='scrollBox'>
            {prodInBasket.map(x => (
              <BasketItem
                key={x.id}
                item={x}
                onChange={handleChangeQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))
            }
          </div>
          <Button
            type="primary"
            size='large'
            onClick={handleCreateOrder}
          >Оформить заказ</Button>
        </div>
      }
      {response.isError &&
        <Alert message={getError(response.error as ResponseError)} type="error" style={{ marginBottom: 20 }} />
      }
    </div>
  )
}

export default BasketPage