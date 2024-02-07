import { NavLink, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@reducers/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './short-order-cart.module.css';
import cn from 'classnames';

import { IOrderInfo, orderInfoStatus } from "@interfaces/index";
import { IIngredient } from '@interfaces/index'; 

function CartIngredients({ ingredients }: { ingredients: Array<IIngredient>| null }): React.JSX.Element {
    return (
        <div>
            <ul className={cn(style.short_cart_ingredients_container)}>
                {ingredients ? ingredients.map((ingredient, index) => (
                    <li key={ingredient._id} className={cn(style.short_cart_ingredient_list_container)} style={{ zIndex: ingredients.length - index, left: -32 * index }}>
                        <div className={cn(style.short_cart_ingredient_img_container)}>
                            <img className={cn(style.short_cart_ingredient_img)} src={ingredient.image} alt={ingredient.name} />
                        </div>
                    </li>
                )): null}
            </ul>
        </div>
    )
}

interface IOrderCartProps {
    order: IOrderInfo;
    to: string;
}

export default function ShortOrderCart({ order, to }: IOrderCartProps): React.JSX.Element {
    const location = useLocation();
    const { ingredients } = useAppSelector(state => state.ingredients);
    const [ orderIngredients, setOrderIngredients ] = useState<Array<IIngredient> | null>(null);

    useEffect(() => {
        if (order.ingredients) {
            setOrderIngredients(ingredients.filter(ingredient => order.ingredients.includes(ingredient._id)))
        } else {
            setOrderIngredients(null);
        }
    }, [ingredients])

    const getPrice = useCallback((OrderIngredientsInfo: Array<IIngredient> | null) => {
        if (!OrderIngredientsInfo) return 0;
        return OrderIngredientsInfo.reduce((acc, ingredient) => acc + ingredient.price, 0);
    }, [ingredients]);

    return (
        <NavLink 
            to={`${to}${order.number}`}
            state={{ background: location }}
            className={cn(style.short_cart_container, 'p-6', 'mb-6')}>
            <div className={cn(style.short_cart_header)}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <p className='text text_type_main-default text_color_inactive'>Сегодня, 16:20</p>
            </div>
            <div className='mt-6'>
                <p className='text text_type_main-medium'>{order.name}</p>
            </div>
            <div className='mt-2'>
                <p className={cn('text', 'text_type_main-default', order.status === orderInfoStatus.DONE ? 'text_color_success' : '')}>{order.status === orderInfoStatus.DONE ? 'Выполнен' : 'Готовится'}</p>
            </div>
            <div className={cn(style.short_cart_footer, 'mt-2')} >
                <CartIngredients ingredients={orderIngredients} />
                <div className={cn(style.short_cart_footer_price)}>
                    <p className='text text_type_digits-default mr-1'>{getPrice(orderIngredients)}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </NavLink>
    )
}