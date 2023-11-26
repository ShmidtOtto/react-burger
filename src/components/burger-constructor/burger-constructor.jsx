import { useState } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';


function BurgerConstructor({ ingredients = [], className = '' }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const topBun = ingredients[0];
    const bottomBun = ingredients[ingredients.length - 1];
    return (
        <section className={cn(style.burger_constructor_container, className)}>
            <Modal isOpen={modalIsOpen} close={closeModal}><OrderDetails /></Modal>
            <div className={cn(style.burger_constructor_ingredients_container, "mr-4")}>
                <div className={style.burger_constructor_ingredient_container}>
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={topBun.name}
                        price={topBun.price}
                        thumbnail={topBun.image}
                    />
                </div>
                <div className={cn(style.burger_constructor_ingredients_scroll_container, "custom-scroll", "pr-4")}>
                    {ingredients.map((ingredient, index) => {
                        if (index === 0 || index === ingredients.length - 1) return (<div key={ingredient._id}></div>)
                        return (
                            <div className={style.burger_constructor_ingredient_container} key={ingredient._id}>
                                <div className="mr-2"><DragIcon type="primary" /></div>
                                <ConstructorElement
                                    isLocked={false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className={style.burger_constructor_ingredient_container}>
                    <ConstructorElement
                        type={'bottom'}
                        isLocked={true}
                        text={bottomBun.name}
                        price={bottomBun.price}
                        thumbnail={bottomBun.image}
                    />
                </div>
            </div>
            <div className={`${style.burger_constructor_order_container} pt-10`}>
                <div className={`${style.burger_constructor_order_container_price} pr-10`}>
                    <p className="text text_type_main-large pr-4">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
    })).isRequired,
    className: PropTypes.string
}

export default BurgerConstructor;