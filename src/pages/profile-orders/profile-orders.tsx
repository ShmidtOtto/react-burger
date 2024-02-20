import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@reducers/hooks';

import { WebsocketStatus } from '@interfaces/index';

import { wsConnectProfileFeed, wsDisconnectProfileFeed } from '@reducers/profileFeedOrderReducer';

import ShortOrderCartslist from '@components/short-order-carts-list/short-order-carts-list';

export default function ProfileOrders(): React.JSX.Element {
    const { status, orders } = useAppSelector(store => store.profileFeedOrder);
    const isDisconnected = status !== WebsocketStatus.ONLINE;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsConnectProfileFeed('wss://norma.nomoreparties.space/orders?token=' + localStorage.getItem('accessToken')?.replace('Bearer ', '')));
        return () => {
            dispatch(wsDisconnectProfileFeed());
        }
    }, [dispatch]);

    if (isDisconnected) {
        return <></>;
    }
    return (
        <div className='ml-10'>
            <ShortOrderCartslist orders={orders} to={'/profile/orders/'}/> 
        </div>
    )
}