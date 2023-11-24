import { useState } from "react";
import cn from 'classnames';
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modals/modal/modal';
import OrderDetails from "../modals/order-details/order-details";


function BurgerConstructor({ ingredients, className }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    const topBun = ingredients[0];
    const bottomBun = ingredients[ingredients.length - 1];
    return (
        <section className={cn(style.burger_constructor_container, className)}>
            <Modal isOpen={modalIsOpen} close={closeModal}><OrderDetails/></Modal>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }} className="mr-4">
                <div className={style.burger_constructor_ingredient_container}>
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={topBun.name}
                        price={topBun.price}
                        thumbnail={topBun.image}
                        key={topBun._id}
                    />
                </div>
                <div style={{overflowY: 'scroll', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px', height: '620px'}} className="custom-scroll pr-4">
                    {ingredients.map((ingredient, index) => {
                        if (index === 0 || index === ingredients.length - 1) return (<></>)
                        return (
                            <div className={style.burger_constructor_ingredient_container}>
                                <div className="mr-2"><DragIcon type="primary" /></div>
                                <ConstructorElement
                                    isLocked={false}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    key={ingredient._id}
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
                        key={bottomBun._id}
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
    ingredients: PropTypes.array.isRequired
}

export default BurgerConstructor;