import { IIngredient, IOrderInfo, orderInfoStatus } from "@interfaces/index";

import cn from 'classnames';
import style from './order-cart.module.css'

import { CurrencyIcon, FormattedDate  } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from "@reducers/hooks";
import { useEffect, useState } from "react";

interface IOrderCartProps {
    order: IOrderInfo | null;
}

function IngredientsList({ ingredients }: { ingredients: Map<IIngredient, number> | null }): React.JSX.Element {
    if (!ingredients) {
        return <></>;
    }

    const ingredientsList = Array.from(ingredients.entries());

    return (
        <ul className={cn(style.order_cart_ingredient_list)}>
            {ingredientsList.map(([ingredient, count]) => (
                <li className={cn('text', 'text_type_main-default', 'mt-4', style.order_cart_ingredient_item)} key={ingredient._id}>
                    <div className={cn(style.order_cart_ingredient_img_container)}>
                        <img className={cn(style.order_cart_ingredient_img)} src={ingredient.image} alt={ingredient.name} />
                    </div>
                    <p>{ingredient.name}</p>
                    <div className={cn(style.order_cart_ingredient_item_currency)}>
                        <p className="text text_type_digits-default mr-2">{count} X {count * ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default function OrderCart({ order }: IOrderCartProps): React.JSX.Element {
    const { ingredients } = useAppSelector(state => state.ingredients);
    const [ orderIngredients, setOrderIngredients ] = useState<Map<IIngredient, number> | null>(null);

    useEffect(() => {
        if (order && order.ingredients) {
            const filteredIngredients = ingredients.filter(ingredient => order.ingredients.includes(ingredient._id));
            const ingredientByCount = new Map<IIngredient, number>();
            order.ingredients.forEach(orderIngredient => {
                const ingredient = filteredIngredients.find(ingredient => ingredient._id === orderIngredient);
                if (!ingredient) return;
                if (ingredientByCount.has(ingredient)) {
                    let ingredientsCount = ingredientByCount.get(ingredient)!;
                    ingredientByCount.set(ingredient, ++ingredientsCount);
                } else {
                    ingredientByCount.set(ingredient, 1);
                }
            });

            setOrderIngredients(ingredientByCount)
        } else {
            setOrderIngredients(null);
        }
    }, [ingredients, order]);

    const getOrderPrice = (ingredients: Map<IIngredient, number> | null): number => {
        if (!ingredients) return 0;
        const ingredientsList = Array.from(ingredients.entries());
        return ingredientsList.reduce((acc, ingredient) => acc + ingredient[1] * ingredient[0].price, 0);
    }

    if (!order) {
        return <></>;
    }

    return (
        <div className={cn(style.order_cart_container)}>
            <div>
                <p className="text text_type_digits-default">#{order.number}</p>
            </div>
            <h1 className="text text_type_main-medium mt-10">{order.name}</h1>
            <div className={cn(style.order_cart_ingredients_compound, 'mt-3')}>
                <p className={cn('text', 'text_type_main-default', orderInfoStatus.DONE ? 'text_color_success' : '')}>
                    {order.status === orderInfoStatus.DONE ? 'Выполнен' : 'Готовится'}
                </p>
            </div>
            <div className={cn(style.order_cart_ingredients_compound, 'mt-15')}>
                <p className="text text_type_main-default">Состав:</p>
            </div>
            <div className={cn(style.order_cart_ingredients_container, 'mt-6')}>
                <IngredientsList ingredients={orderIngredients}/>
            </div>
            <div className={cn(style.order_cart_footer, 'mt-10')}>
                <p className="text text_type_main-default">
                    <FormattedDate date={new Date(order.createdAt)} />
                </p>
                <p className={cn(style.order_cart_footer_price)}>
                    <span className="text text_type_digits-default mr-2">{getOrderPrice(orderIngredients)}</span>
                    <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}