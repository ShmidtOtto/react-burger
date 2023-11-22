import React from 'react';
import style from './burger-ingredients-cart.module.css';

import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientCart({ image, price, name, className }) {
    className = className ? className : '';
    return (
        <div className={`${style.burger_ingridients_category_item} ${className}`}>
            <img src={image} alt={name} className="pl-4 pr-4 pb-1"/>
            <div className={`${style.burger_ingridients_category_price_container} pb-1`}>
                <p style={{wordBreak: 'break-all', maxWidth: '280px'}} className='text text_type_digits-default pr-1'>{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{name}</p>
        </div>
    );
}

BurgerIngredientCart.prototypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default BurgerIngredientCart;