import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@reducers/hooks';

import { getOrder, removeOrder } from '@reducers/feedOrderReducer';

import OrderCart from '@components/order-cart/order-cart';

import cn from 'classnames';
import style from './profile-order.module.css';

import { IOrderInfo } from "@interfaces/index";
import { useEffect } from 'react';

const orderUrl = 'https://norma.nomoreparties.space/api/orders';

export default function ProfileOrder(): React.JSX.Element {
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
        <div className={cn(style.profile_order_container, 'mt-20')}>
            <OrderCart order={order as IOrderInfo} />
        </div>
    )
}