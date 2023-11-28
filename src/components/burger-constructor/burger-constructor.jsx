import { useState, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';

import { IngredientsContext } from '../../services/ingredientsContext';


function BurgerConstructor({ className = '' }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { ingredients } = useContext(IngredientsContext);

    function getTotalPrice(ingredients, topBun, bottomBun) {
        let total = ingredients.reduce((total, current) => total + current.price, 0);

        total += topBun.price;
        total += bottomBun.price;
        return total;
    }

    const ingredientsDispatcher = function (state, action) {
        switch (action.type) {
            case 'remove':
                let newState = { ...state };
                newState.ingredients = newState.ingredients.filter((ingredient) => ingredient._id !== action.payload);
                newState.finalCost = getTotalPrice(newState.ingredients, newState.topBun, newState.bottomBun);
                return newState;
            default:
                return state;
        }
    }

    const [topBun, bottomBun] = ingredients.filter(ingredient => ingredient.type === 'bun');
    const mainIngredients = ingredients.filter(ingredient => ingredient.type !== 'bun');

    const [constructorIngredientsState, constructorIngredientsDispatcher] = useReducer(
        ingredientsDispatcher,
        {},
        () => {
            return {
                topBun: topBun,
                bottomBun: bottomBun,
                finalCost: getTotalPrice(mainIngredients, topBun, bottomBun),
                ingredients: mainIngredients
            }
        }
    );

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    return (
        <section className={cn(style.burger_constructor_container, className)}>
            <Modal isOpen={modalIsOpen} close={closeModal}><OrderDetails ingredientsIds={constructorIngredientsState.ingredients}/></Modal>
            <div className={cn(style.burger_constructor_ingredients_container, "mr-4")}>
                <div className={style.burger_constructor_ingredient_container}>
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={constructorIngredientsState.topBun.name}
                        price={constructorIngredientsState.topBun.price}
                        thumbnail={constructorIngredientsState.topBun.image}
                    />
                </div>
                <div className={cn(style.burger_constructor_ingredients_scroll_container, "custom-scroll", "pr-4")}>
                    {constructorIngredientsState.ingredients.map(ingredient => {
                        return (
                            <div className={style.burger_constructor_ingredient_container} key={ingredient._id}>
                                <div className="mr-2"><DragIcon type="primary" /></div>
                                <ConstructorElement
                                    isLocked={false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() => constructorIngredientsDispatcher({ type: 'remove', payload: ingredient._id })}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className={style.burger_constructor_ingredient_container}>
                    <ConstructorElement
                        type={'bottom'}
                        isLocked={true}
                        text={constructorIngredientsState.bottomBun.name}
                        price={constructorIngredientsState.bottomBun.price}
                        thumbnail={constructorIngredientsState.bottomBun.image}
                    />
                </div>
            </div>
            <div className={`${style.burger_constructor_order_container} pt-10`}>
                <div className={`${style.burger_constructor_order_container_price} pr-10`}>
                    <p className="text text_type_main-large pr-4">{constructorIngredientsState.finalCost}</p>
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
    className: PropTypes.string
}

export default BurgerConstructor;