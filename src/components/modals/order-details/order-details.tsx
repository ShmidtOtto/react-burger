import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@reducers/hooks';
import { createOrder } from '@reducers/orderReducer';

import cn from 'classnames';
import style from './order-details.module.css';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../spinner/spinner';

import frame from './frame.svg';
import frame2 from './frame2.svg';
import frame3 from './frame3.svg';
const orderUrl = 'https://norma.nomoreparties.space/api/orders';

interface IOrderDetailsProps {
    className?: string
}

function OrderDetails({ className }: IOrderDetailsProps) : React.JSX.Element {
    const duspach = useAppDispatch();
    const { constructorIngredients, bun } = useAppSelector(state => state.constructorIngredients);
    const { orderNumber } = useAppSelector(state => state.order.currentOrder);

    useEffect(() => {
        if (bun) {
            duspach(createOrder({ orderUrl: orderUrl, ingredients: [bun, ...constructorIngredients, bun] }));
        }
    }, [duspach, constructorIngredients, bun]);

    return (
        <>
            {!orderNumber ? <Spinner /> :
                <div className={cn(style.order_details_container, className)}>
                    <h2 className={cn('text', 'text_type_digits-large', 'mt-20')} data-test-id="order-number">{orderNumber}</h2>
                    <p className={cn('text', 'text_type_main-medium', 'mt-8')}>идентификатор заказа</p>
                    <div className={cn(style.ok_container, 'mt-15')}>
                        <img src={frame} alt="order ok frame" className={style.frame} />
                        <img src={frame2} alt="order ok frame" className={style.frame} />
                        <img src={frame3} alt="order ok frame" className={style.frame} />
                        <div className={style.frame}>
                            <CheckMarkIcon type="primary" />
                        </div>
                    </div>
                    <p className={cn('text', 'text_type_main-medium', 'mt-15')}>Вашь заказ начали готовить</p>
                    <p className={cn('text', 'text_type_main-medium', 'text_color_inactive', 'mt-2', 'mb-30')}>Дождитесь готовности на орбитальной станции</p>
                </div>
            }
        </>
    )
}

export default OrderDetails;