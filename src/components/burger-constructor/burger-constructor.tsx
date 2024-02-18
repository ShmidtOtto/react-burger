import { useState, FC } from 'react';
import { useAppSelector, useAppDispatch } from '@reducers/hooks';
import { IIngredient } from '@interfaces/index';

import { useNavigate } from 'react-router-dom';

import cn from 'classnames';
import style from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmptyConstructorElement } from './empty-constructor-element/empty-constructor-element';
import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';

import BurgerCounstructorElement from './burger-constructor-element/burger-constructor-element';

import { useDrop } from 'react-dnd';

import { addIngredient, addBun } from '@reducers/constructorIngredientsReducer';

interface IBurgerConstructor {
    className?: string
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ className = '' }): JSX.Element => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { totalPrice, buns: [topBun, bottomBun], constructorIngredients } = useAppSelector(state => state.constructorIngredients);
    const { user } = useAppSelector(state => state.user);

    const openModal = (): void => {
        if (!user) {
            navigate('/login');
        } else {
            setModalIsOpen(true);
        }
    }

    const closeModal = (): void => {
        setModalIsOpen(false);
    }

    const [, dropIngredientRef] = useDrop<IIngredient, unknown, unknown>(() => ({
        accept: 'ingredient',
        drop(ingredient) {
            dispatch(addIngredient(ingredient));
        }
    }));

    const [, dropTopBunRef] = useDrop<IIngredient, unknown, unknown>(() => ({
        accept: 'bun',
        drop(ingredient) {
            dispatch(addBun(ingredient));
        }
    }));

    const [, dropBottomBunRef] = useDrop<IIngredient, unknown, unknown>(() => ({
        accept: 'bun',
        drop(ingredient) {
            dispatch(addBun(ingredient));
        }
    }));

    return (
        <section className={cn(style.burger_constructor_container, className)}>
            {modalIsOpen && <Modal close={closeModal}><OrderDetails /></Modal>}
            <div className={cn(style.burger_constructor_ingredients_container, "mr-4")}>
                <div className={style.burger_constructor_ingredient_container} ref={dropTopBunRef} data-test-id='top-bun'>
                    {topBun ? <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={topBun.name}
                        price={topBun.price}
                        thumbnail={topBun.image}
                    /> : <EmptyConstructorElement type={'top'} />}
                </div>
                <div className={cn(style.burger_constructor_ingredients_scroll_container, "custom-scroll", "pr-4")} data-test-id='constructor'>
                    {
                        !constructorIngredients.length ?
                            <div ref={dropIngredientRef}>
                                <EmptyConstructorElement />
                            </div> : constructorIngredients.map(ingredient => {
                                return (
                                    <div key={ingredient.uuid}>
                                        <BurgerCounstructorElement ingredient={ingredient} />
                                    </div>
                                )
                            })
                    }
                </div>
                <div className={style.burger_constructor_ingredient_container} ref={dropBottomBunRef} data-test-id='bottom-bun'>
                    {bottomBun ? <ConstructorElement
                        type={'bottom'}
                        isLocked={true}
                        text={bottomBun.name}
                        price={bottomBun.price}
                        thumbnail={bottomBun.image}
                    /> : <EmptyConstructorElement type={'bottom'} />}
                </div>
            </div>
            <div className={`${style.burger_constructor_order_container} pt-10`}>
                <div className={`${style.burger_constructor_order_container_price} pr-10`}>
                    <p className="text text_type_main-large pr-4">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={openModal} data-test-id={'submit-order'}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;