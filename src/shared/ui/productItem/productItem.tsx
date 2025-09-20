import { type FC } from 'react';
import { Button, Card, Flex, Image, Space, Statistic } from 'antd';
import { LikeOutlined, EditOutlined } from '@ant-design/icons'
import './productItem.css';

import { useAuth } from '../../../app/providers';
import type { Product } from '../../../entities';


export interface ProductItemProps {
    product: Product
    editLink?: string
    onAddToBasket?: (product: Product) => void
};

/**
 * Компонент полного отображения товара
 */
const ProductItem: FC<ProductItemProps> = ({ product, editLink: edit, onAddToBasket }) => {
    const { isAdmin } = useAuth()

    const handleAddToBasket = () => {
        if (onAddToBasket)
            onAddToBasket(product)
    }

    return (
        <Card
            className='product-card'
            title={product.name}
            extra={isAdmin() && (!!edit) && <a href={edit}>ред <EditOutlined/></a>}
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
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Card >
    );
};

export default ProductItem;