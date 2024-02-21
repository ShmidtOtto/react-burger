import { useAppSelector, useAppDispatch } from '@reducers/hooks';
import { WebsocketStatus } from '@interfaces/index';
import { useEffect } from 'react';

import FeedInfo from './feed-info/feed-info';
import ShortOrderCartslist from '@components/short-order-carts-list/short-order-carts-list';

import cn from 'classnames';
import style from './feed.module.css';

import { wsConnectFeed, wsDisconnectFeed } from '@reducers/feedOrdersReducer';

export default function Feed(): React.JSX.Element {
    const { status, orders, total, totalToday } = useAppSelector(store => store.feedOrders);
    const isDisconnected = status !== WebsocketStatus.ONLINE;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(wsConnectFeed('wss://norma.nomoreparties.space/orders/all'));
        return () => {
            dispatch(wsDisconnectFeed());
        }
    }, [dispatch]);

    if (isDisconnected) {
        return <></>;
    }

    return (
        <div className={cn(style.feed_container)}>
            <div className={cn(style.feed_container_header)}>
                <h1 className={cn('text', 'text_type_main-large', 'mb-5', 'mt-5')}>Лента заказов</h1>
            </div>
            <div className={cn(style.feed_container_content, 'mb-15')}>
                <ShortOrderCartslist orders={orders} className={cn('mr-15')} to={'/feed/'}/>
                <FeedInfo total={total} totalToday={totalToday} orders={orders}/>
            </div>
        </div>
    )
}