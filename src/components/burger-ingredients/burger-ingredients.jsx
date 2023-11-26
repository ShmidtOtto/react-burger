import { useState } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-ingredients.module.css';

import ingredientsTranslate from '../../utils/ingredients-translate';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCategory from './burger-ingredient-category/burger-ingredient-category';

function BurgerIngredients({ ingredients = [], className = '' }) {
    const [current, setCurrentTab] = useState('Булки');

    let categories = [];
    ingredients.forEach(ingredient => {
        if (!categories.includes(ingredient.type)) categories.push(ingredient.type);
    });

    return (
        <section className={cn(style.burger_ingredients_container, className)}>
            <h3 className="text text_type_main-medium pb-5 ">Соберите бургер</h3>
            <div className={cn(style.burger_ingredients_tab, "pb-10")}>
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
            <div className={cn(style.burger_ingredients_scroll_container, "custom-scroll")}>
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

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;