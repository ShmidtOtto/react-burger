import React from "react";
import style from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerConstructor(props) {
    const { ingredients } = props;

    return (
        <section сlassName={style.burger_constructor_container}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ingredients.map((ingredient, index) => {
                    let type = index === 0 ? 'top' : (index === ingredients.length - 1 ? 'bottom' : '');
                    return (
                        <ConstructorElement
                            type={type}
                            isLocked={type === 'top' || type === 'bottom' ? true : false}
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            key={ingredient._id}
                        />
                    )
                })}
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