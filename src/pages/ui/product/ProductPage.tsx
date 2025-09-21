import { type FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { Flex, Typography } from "antd"
import { EditOutlined } from '@ant-design/icons'

import { APP_ROUTE } from "../../../app"
import { CategoryApi, ProductApi } from "../../../app/api"
import { useAuth } from "../../../app/providers"
import { basketActions } from "../../../app/store"
import { CategorySelector, ProductItem } from "../../../shared"
import { categoryFilter, GetBasketFromProduct, type Category, type Product } from "../../../entities"
import './ProductPage.css'


const LIST_GROW_COUNT = 4

// Список товаров
let products = new Map<string, Product>()
let page = 1


const ProductPage: FC = () => {
  const { isAdmin } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatcher = useDispatch()
  const [lastItem, setLastItem] = useState<Element>()
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([])
  const [product, setProduct] = useState<Product[]>([])
  const navigator = useNavigate()

  const categoryApi = CategoryApi.useRtkGetCategorysQuery(categoryFilter)
  const categories = categoryApi.data
  const [getProducts] = ProductApi.useRtkGetProductsMutation()

  // Загружаем следующую страницу продуктов
  const loadNextProduct = () => {
    getProducts(
      {
        categoryIds: selectedCategory.map(x => x.name),
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
  }, [selectedCategory])

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
    dispatcher(basketActions.add(GetBasketFromProduct(product)))
  }

  const handleChangeCategory = (selected: string[]) => {
    setSelectedCategory(selectedCategory.filter(x => selected.includes(x.id)))
    console.debug('sel ==', selected)
  }

  return (
    <>
      <Flex vertical className="category">
        <Typography.Title level={5}>Категории</Typography.Title >
        <Flex>
          <CategorySelector
            options={categories?.data.map(x => ({label: x.name, value: x.id})) ?? []}
            defaults={(categories && categories.data.length > 0) ? [categories?.data[0].name] : []}
            onChange={handleChangeCategory}
            />
          <span className="categoty-link">
            <Typography.Link
              href={APP_ROUTE.category}>
              ред <EditOutlined />
            </Typography.Link>
          </span>
        </Flex>
      </Flex>
      <div className='scrollBox' ref={containerRef}>
        {product.length > 0 &&
          product.map(x => (
            <ProductItem
              key={x.id}
              product={x}
              editLink={`${APP_ROUTE.productEdit}/${x.id}`}
              onAddToBasket={handleAddToBasket}
            />
          ))
        }
      </div>

      {isAdmin() &&
        <div className="add-product-link">
          <Typography.Link
            onClick={() => navigator(APP_ROUTE.productAdd)}
          >
            Новый товар
          </Typography.Link>
        </div>
      }
    </>
  )
}

export default ProductPage