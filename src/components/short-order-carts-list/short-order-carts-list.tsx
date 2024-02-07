import ShortOrderCart from '@components/short-order-cart/short-order-cart';
import cn from 'classnames';
import style from './short-order-carts-list.module.css';

import { IOrderInfo } from "@interfaces/index";
import React from 'react';

interface IShortOrderCartslistProps {
    orders: Array<IOrderInfo>;
    to: string;
}
export default function ShortOrderCartslist({ orders, to, className } : IShortOrderCartslistProps & React.HTMLProps<HTMLDivElement>): React.JSX.Element {
    return (
        <div className={cn(style.order_carts_scroll_container, style.order_carts_container, className)}>
            {orders.map(order => (
                <ShortOrderCart key={order.number} order={order} to={to}/>
            ))}
        </div>
    )
}