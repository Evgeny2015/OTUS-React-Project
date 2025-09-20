import { type FC } from 'react';
import './basketItem.css';
import { Button, Card, Flex, Image, InputNumber, Space, type InputNumberProps } from 'antd';

import type { BasketProductModel } from '../../../entities';


export type BasketProductProps = {
    item: BasketProductModel
    onChange: (item: BasketProductModel, quantity: number) => void
    onRemoveItem: (id: BasketProductModel["id"]) => void
};


/**
 * Компонент отображения товара для корзины
 */
const BasketItem: FC<BasketProductProps> = ({ item, onChange, onRemoveItem }) => {

    const handleChangeQuantity: InputNumberProps["onChange"] = (value) => {
        if (value)
            onChange(item, Number(value))
    }

    return (
        <Card
            className='basket-card'
            title={item.name}
        >
            <Flex vertical={true}>
                <Flex vertical={false}>
                    <Image
                        height={150}
                        width={150}
                        src={item.photo}
                    />
                    <Space direction="vertical">
                        <div>
                            <InputNumber
                                min={1}
                                max={100}
                                defaultValue={item.quantity}
                                onChange={handleChangeQuantity}
                                changeOnWheel
                            ></InputNumber>
                        </div>
                        <Button
                            type='primary'
                            onClick={() => onRemoveItem(item.id)}>
                            Удалить
                        </Button>
                    </Space>
                </Flex>
                <div><h4>{item.name}</h4></div>
                <div><h3>{item.price} ₽</h3></div>
            </Flex>
        </Card>
    );
};

export default BasketItem