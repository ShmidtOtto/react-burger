import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@reducers/hooks';

import OrderCartComponent from '@components/order-cart/order-cart';

import { getOrder, removeOrder } from '@reducers/feedOrderReducer';
import { useParams } from 'react-router-dom';
import { IOrderInfo } from '@interfaces/index';


const orderUrl = 'https://norma.nomoreparties.space/api/orders';
export default function OrderCart() {
    const dispatch = useAppDispatch();
    const { id } = useParams<string>();

    const order = useAppSelector(store => {
        if (id) {
            let order = store.feedOrders.orders.find(order => order._id === id);
            if (order) return order;

            order = store.profileFeedOrder.orders.find(order => order._id === id);
            if (order) return order;

            if (store.feedOrderReducer.order) {
                return store.feedOrderReducer.order
            }

            return null;
        }
    });

    useEffect(() => {
        if (id && !order) {
            dispatch(getOrder({ orderUrl: orderUrl, orderNumber: id}));
        }

        return () => {
            removeOrder();
        }
    }, [id, order]);

    if (!id) {
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