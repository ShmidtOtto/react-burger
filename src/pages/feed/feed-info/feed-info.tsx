import { IOrderInfo, orderInfoStatus } from "@interfaces/index";
import React from 'react';

import cn from 'classnames';
import style from './feed-info.module.css';

interface IOrderQueueProps {
    name: string;
    ordersNumber?: Array<number>;
    ordersNumberStyle?: string;
}
function OrdersQueue({ name, ordersNumber, ordersNumberStyle }: IOrderQueueProps): React.JSX.Element {
    const max = 10;
    if (ordersNumber) ordersNumber = ordersNumber.slice(0, max);

    return (
        <div className={cn(style.order_queue_conteiner)}>
            <p className={cn('text', 'text_type_main-medium', 'mb-6')}>{ name }</p>
            <ul>
                {ordersNumber?.map(orderNumber => (
                    <li className={cn('text', 'text_type_digits-default', ordersNumberStyle ? ordersNumberStyle : '')} key={orderNumber}>{orderNumber}</li>
                ))}
            </ul>
        </div>
    )
}

interface IFeedInfoProps {
    orders: Array<IOrderInfo>;
    total: number;
    totalToday: number;
}

export default function FeedInfo({orders, total, totalToday}: IFeedInfoProps): React.JSX.Element {
    const readyOrders = (orders: Array<IOrderInfo>): Array<number> | [] => {
        const doneOrders = orders.filter(order => order.status === orderInfoStatus.DONE);
        if (doneOrders.length) return doneOrders.map(doneOrder => doneOrder.number);
        return [];
    };

    const pandingOrders = (orders: Array<IOrderInfo>): Array<number> | [] => {
        const doneOrders = orders.filter(order => order.status === orderInfoStatus.PANDING);
        if (doneOrders.length) return doneOrders.map(doneOrder => doneOrder.number);
        return [];
    };

    return (
        <div className={cn(style.feed_info_container)}>
            <div className={cn(style.feed_orders_queue_container, 'mb-15')}>
                <OrdersQueue name="Готовы:" ordersNumber={readyOrders(orders)} ordersNumberStyle="text_color_success"/>
                <OrdersQueue name="В работе:" ordersNumber={pandingOrders(orders)}/>
            </div>
            <div className='mb-15'>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <h1 className='text text_type_digits-large'>{total}</h1>
            </div>
            <div>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <h1 className='text text_type_digits-large'>{totalToday}</h1>
            </div>
        </div>
    )
}