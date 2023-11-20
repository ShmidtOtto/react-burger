import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
    const [current, setCurrentTab] = React.useState('one');
    return (
        <section>
            <h3 className="text text_type_main-medium pb-5">Соберите бургер</h3>
            <div style={{ display: 'flex' }} className="pb-10">
                <Tab value="Булки" active={current === 'Булки'} onClick={() => setCurrentTab('Булки')}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={() => setCurrentTab('Соусы')}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={() => setCurrentTab('Начинки')}>
                    Начинки
                </Tab>
                </div>
        </section>
    );
}

export default BurgerIngredients;