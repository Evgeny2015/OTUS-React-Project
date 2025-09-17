import { type FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { Button } from "antd"

import { ProductApi } from "../../../app/api"
import { useAuth } from "../../../app/providers"
import { basketActions } from "../../../app/store"
import { ProductItem } from "../../../shared"
import type { Product } from "../../../entities"
import './ProductPage.css'


// const PRODUCT_LIST_COUNT = 20
const LIST_GROW_COUNT = 10

// Список товаров
let products = new Map<string, Product>()
let page = 1

const ProductPage: FC = () => {
  const { isAdmin } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatcher = useDispatch()
  const [lastItem, setLastItem] = useState<Element>()
  const [product, setProduct] = useState<Product[]>([])
  const navigator = useNavigate()
  const [getProducts] = ProductApi.useRtkGetProductsMutation()

  // Загружаем следующую страницу продуктов
  const loadNextProduct = () => {
    getProducts(
      {
        pagination: {
          pageSize: LIST_GROW_COUNT,
          pageNumber: page
        },
        sorting: {
          type: 'ASC',
          field: 'name'
        }
      }
    )
      .then(x => {
        if (x.data) {
          page++
          x.data.data.forEach(x => products.set(x.id, x))
          setProduct([...products.values()])
        }
      }
      )
  }

  // Сохраняем последний элемент из списка. Этот элемент используется для наблюдения
  const setLastItemHandle = () => {
    const items = containerRef.current?.children
    if (!items) return

    const item = items[items.length - 1]
    setLastItem(item)
  }

  // Если последний элемент становится видимым, загружаем элементы в список
  const intersectionCallback = (entries: any) => {
    if (entries[0].isIntersecting) {
      loadNextProduct()
    }
  }

  // Создаем наблюдателя
  const observer = useRef(new IntersectionObserver(intersectionCallback))

  // Первая загрузка компонента
  useEffect(() => {
    if (!products.size)
      loadNextProduct()
    else
      setProduct([...products.values()])
  }, [])

  // При изменении списка запоминаем последнюю позицию
  useEffect(() => {
    setLastItemHandle()
  }, [product])

  // Устанавливаем наблюдатель за последней позицией
  useEffect(() => {
    observer.current.disconnect()

    if (lastItem) {
      observer.current.observe(lastItem)
    }

    return () => {
      if (lastItem) {
        observer.current.unobserve(lastItem)
      }
    }
  }, [lastItem])

  // добавляем товар в корзину
  const handleAddToBasket = (product: Product) => {
    dispatcher(basketActions.add(product))
  }

  // редактируем товар
  const handleEditProduct = (product: Product) => {
    navigator(`/edit/${product?.id}`)
  }

  // новый товар
  const handleAddProduct = () => {
    navigator('/add')
  }

  return (
    <div>
      <div className='scrollBox' ref={containerRef}>
        {product.length > 0 &&
          product.map(x => (
            <ProductItem
              key={x.id}
              product={x}
              onAddToBasket={handleAddToBasket}
              onEditProduct={() => handleEditProduct(x)}
            />
          ))
        }
      </div>

      {isAdmin() &&
        <Button type="primary" onClick={() => handleAddProduct()}>Новый товар</Button>
      }
    </div>
  )
}

export default ProductPage