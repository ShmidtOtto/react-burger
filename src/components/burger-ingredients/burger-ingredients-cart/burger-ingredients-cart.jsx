import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-ingredients-cart.module.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from 'react-dnd';

import { addIngredient } from '../../../services/reducers/ingredientDetailsReducer';

function BurgerIngredientCart({ image = '', price = 0, name = '', proteins = 0, fat = 0, carbohydrates = 0, calories = 0, className = '', _id = '', type = '' }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const { constructorIngredients, buns } = useSelector(state => state.constructorIngredients);
    const [count, setState] = useState(0);

    useEffect(() => {
        if (type === 'bun') {
            setState(buns.filter(ingredient => ingredient._id === _id).length);
        } else {
            setState(constructorIngredients.filter(ingredient => ingredient._id === _id).length);
        }
    }, [constructorIngredients, buns, _id, type]);

    const [, dragRef] = useDrag(() => ({
        type: type === 'bun' ? 'bun' : 'ingredient',
        item: {image, price, name, proteins, fat, carbohydrates, calories, _id, type},
    }))

    const openModal = (ingredient) => {
        dispatch(addIngredient(ingredient));
    }

    return (
        <div className={cn(className)}>
            <NavLink 
                to={`/ingredients/${_id}`}
                state={{ background: location }}>
                <div className={cn(style.burger_ingredients_category_item, style.burger_ingredients_category_count_coutainer)}
                    ref={dragRef}
                    onClick={() => openModal({ image, name, proteins, fat, carbohydrates, calories })}>
                    <Counter count={count} size="small" extraClass='m-1'/>
                    <img src={image} alt={name} className="pl-4 pr-4 pb-1" />
                    <div className={`${style.burger_ingredients_category_price_container} pb-1`}>
                        <p className='text text_type_digits-default pr-1'>{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">{name}</p>
                </div>
            </NavLink>
        </div>
    );

}

BurgerIngredientCart.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default BurgerIngredientCart;