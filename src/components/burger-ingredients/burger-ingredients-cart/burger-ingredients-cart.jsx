import { useState } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-ingredients-cart.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modals/modal/modal';
import IngredientDetails from '../../modals/ingredient-details/ingredient-details';

function BurgerIngredientCart({ image = '', price = 0, name = '', proteins = 0, fat = 0, carbohydrates = 0, calories = 0, className = '' }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [burgerIngredientInfo, setBurgerIngredientInfo] = useState({
        image,
        name,
        proteins,
        fat,
        carbohydrates,
        calories
    });

    const closeModal = () => setModalIsOpen(false);
    const openModal = (ingredient) => {
        setModalIsOpen(true);
        setBurgerIngredientInfo(ingredient);
    }

    return (
        <div className={cn(className)}>
            <Modal
                isOpen={modalIsOpen}
                close={closeModal}
                modatlTitle="Детали ингредиента">
                    <IngredientDetails {...burgerIngredientInfo} />
            </Modal>
            <div className={style.burger_ingridients_category_item}
                onClick={() => openModal({ image, name, proteins, fat, carbohydrates, calories })}>
                <img src={image} alt={name} className="pl-4 pr-4 pb-1" />
                <div className={`${style.burger_ingridients_category_price_container} pb-1`}>
                    <p className='text text_type_digits-default pr-1'>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{name}</p>
            </div>
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
    className: PropTypes.string
}

export default BurgerIngredientCart;