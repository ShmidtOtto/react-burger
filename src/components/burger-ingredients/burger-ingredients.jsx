import React from "react";
import ingredientsTranslate from "../../utils/ingredients-translate";
import style from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCategory from "./burger-ingredient-category/burger-ingredient-category";

function BurgerIngredients({className, ingredients}) {
    className = className ? className : '';
    const [current, setCurrentTab] = React.useState('Булки');
    let categories = [];
    ingredients.forEach(ingredient => {
        if (!categories.includes(ingredient.type)) {
            categories.push(ingredient.type)
        }
    });

    return (
        <section className={`${style.burger_ingredients_container} ${className}`}>
            <h3 className="text text_type_main-medium pb-5 ">Соберите бургер</h3>
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
            <div style={{ overflowY: 'scroll', height: '600px' }} className="custom-scroll">
                {categories.map((category, index) => {
                    return (
                        <BurgerIngredientCategory
                            categoryName={ingredientsTranslate[category]} 
                            key={index} 
                            ingredients={ingredients.filter(ingredient => ingredient.type === category)}
                        />
                    )
                })}
            </div>

        </section>
    );
}

export default BurgerIngredients;