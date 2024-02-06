import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@reducers/hooks';

import OrderCartComponent from '@components/order-cart/order-cart';

import { getOrder, removeOrder } from '@reducers/feedOrderReducer';
import { useParams } from 'react-router-dom';
import { IOrderInfo } from '@interfaces/index';


const orderUrl = 'https://norma.nomoreparties.space/api/orders';

export default function OrderCart() {
    const dispatch = useAppDispatch();
    const { number } = useParams<string>();

    const order = useAppSelector(store => {
        if (number) {
            let order = store.feedOrders.orders.find(order => String(order.number) === number);
            if (order) return order;

            order = store.profileFeedOrder.orders.find(order => String(order.number) === number);
            if (order) return order;

            if (store.feedOrderReducer.order) {
                return store.feedOrderReducer.order
            }

            return null;
        }
    });

    useEffect(() => {
        if (number && !order) {
            dispatch(getOrder({ orderUrl: orderUrl, orderNumber: number}));
        }

        return () => {
            removeOrder();
        }
    }, [number, order]);

    if (!number) {
        return (
            <></>
        )
    }
    
    return (
        <div className='m-6'>
            <OrderCartComponent order={order as IOrderInfo}/>
        </div>
    )
} 