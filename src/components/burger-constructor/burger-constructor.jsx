import React from "react";
import style from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerConstructor({ ingredients, className }) {
    className = className ? className : "";
    const topBun = ingredients[0];
    const bottomBun = ingredients[ingredients.length - 1];
    return (
        <section сlassName={`${style.burger_constructor_container} ${className}`}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }} className="mr-4">
                <div className={style.burger_constructor_ingredient_container}>
                    {/* <div className='pl-6'></div> */}
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={topBun.name}
                        price={topBun.price}
                        thumbnail={topBun.image}
                        key={topBun._id}
                    />
                </div>
                <div style={{overflowY: 'scroll', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px', height: '600px'}} className="custom-scroll pr-4">
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
                    {/* <div className='pl-6'></div> */}
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
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;