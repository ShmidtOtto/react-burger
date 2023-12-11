import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmptyConstructorElement } from './empty-constructor-element/empty-constructor-element';
import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';

import BurgerCounstructorElement from './burger-constructor-element/burger-constructor-element';

import { useDrop } from 'react-dnd'; 

import { addIngredient, addBun } from '../../services/reducers/constructorIngredientsReducer';

function BurgerConstructor({ className = '' }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { totalPrice, buns: [topBun, bottomBun], constructorIngredients } = useSelector(state => state.constructorIngredients);

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const [, dropIngredientRef] = useDrop(() => ({
        accept: 'ingredient',
        drop(ingredient) {
            dispatch(addIngredient(ingredient));
        }
    }));

    const [, dropTopBunRef] = useDrop(() => ({
        accept: 'bun',
        drop(ingredient) {
            dispatch(addBun(ingredient));
        }
    }));

    const [, dropBottomBunRef] = useDrop(() => ({
        accept: 'bun',
        drop(ingredient) {
            dispatch(addBun(ingredient));
        }
    }));

    return (
        <section className={cn(style.burger_constructor_container, className)}>
            <Modal isOpen={modalIsOpen} close={closeModal}><OrderDetails/></Modal>
            <div className={cn(style.burger_constructor_ingredients_container, "mr-4")}>
                <div className={style.burger_constructor_ingredient_container} ref={dropTopBunRef}>
                    { topBun ? <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={topBun.name}
                        price={topBun.price}
                        thumbnail={topBun.image}
                    /> : <EmptyConstructorElement type={'top'}/>}
                </div>
                <div className={cn(style.burger_constructor_ingredients_scroll_container, "custom-scroll", "pr-4")}>
                    {
                        !constructorIngredients.length ? 
                        <div ref={dropIngredientRef}>
                            <EmptyConstructorElement/>
                        </div> : constructorIngredients.map(ingredient => {
                            return (
                                <div key={ingredient.uuid}>
                                    <BurgerCounstructorElement ingredient={ingredient}/>
                                </div>
                                )
                            })
                    }
                </div>
                <div className={style.burger_constructor_ingredient_container} ref={dropBottomBunRef}>
                    { bottomBun ? <ConstructorElement
                            type={'bottom'}
                            isLocked={true}
                            text={bottomBun.name}
                            price={bottomBun.price}
                            thumbnail={bottomBun.image}
                        /> : <EmptyConstructorElement type={'bottom'}/>}
                </div>
            </div>
            <div className={`${style.burger_constructor_order_container} pt-10`}>
                <div className={`${style.burger_constructor_order_container_price} pr-10`}>
                    <p className="text text_type_main-large pr-4">{totalPrice}</p>
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