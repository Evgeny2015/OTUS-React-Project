import { type FC } from 'react';
import { Button, Card, Flex, Image, Space, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons'
import './productItem.css';

import { useAuth } from '../../../app/providers';
import type { Product } from '../../../entities';


export interface ProductItemProps {
    product: Product
    onAddToBasket?: (product: Product) => void
    onEditProduct?: (product: Product) => void
};

/**
 * Компонент полного отображения товара
 */
const ProductItem: FC<ProductItemProps> = ({ product, onAddToBasket, onEditProduct }) => {
    const { isAdmin } = useAuth()

    const handleAddToBasket = () => {
        if (onAddToBasket)
            onAddToBasket(product)
    }

    const handleEditProduct = () => {
        if (onEditProduct)
            onEditProduct(product)
    }

    return (
        <Card
            className='product-card'
            title={product.name}
            >
            <Flex vertical={true}>
                <Flex vertical={false}>
                    <div>
                        <Image
                            height={150}
                            width={150}
                            src={product.photo}
                        />
                    </div>
                    <Flex vertical={false}>
                        <Space direction="vertical">
                            <div className='description'>{product.desc}</div>
                            <Statistic
                                value={product.price}
                                precision={2}
                                prefix={<LikeOutlined />}
                                suffix="₽"
                                className='product-price'
                            />
                        </Space>

                        <Flex vertical gap="small" style={{ width: '100%' }}>
                            <Button
                                type='primary'
                                size='large'
                                onClick={handleAddToBasket}>
                                В корзину
                            </Button>
                            {isAdmin() &&
                                <Button
                                    color="primary"
                                    variant='outlined'
                                    size='small'
                                    onClick={handleEditProduct}
                                >
                                    Ред-ть
                                </Button>
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ProductItem;