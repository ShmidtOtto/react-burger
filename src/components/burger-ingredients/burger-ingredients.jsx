import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-ingredients.module.css';

import ingredientsTranslate from '../../utils/ingredients-translate';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCategory from './burger-ingredient-category/burger-ingredient-category';

function BurgerIngredients({ className = '' }) {
    const [current, setCurrentTab] = useState('Булки');

    const { ingredients, ingredientsCategories } = useSelector(state => state.ingredients);

    const tubsRef = useRef(null)

    const onScrollCategory = (e) => {
        let tubBottom = tubsRef.current.getBoundingClientRect().bottom;
        let categoryPositions = ingredientsCategories.map((category, index) => {
            return {
                category: ingredientsTranslate[category],
                diff: Math.abs(e.target.children[index].getBoundingClientRect().top - tubBottom)
            }
        });

        const closerOffset = 30;
        const closerCategory = categoryPositions.find(category => category.diff < closerOffset);
        if (closerCategory) setCurrentTab(closerCategory.category);
    }

    return (
        <section className={cn(style.burger_ingredients_container, className)}>
            <h3 className="text text_type_main-medium pb-5 ">Соберите бургер</h3>
            <div className={cn(style.burger_ingredients_tab, "pb-10")} ref={tubsRef}>
                {ingredientsCategories.map((category, index) => {
                    const tabName = ingredientsTranslate[category]
                    return <Tab key={index} value={tabName} active={current === tabName} onClick={() => setCurrentTab(tabName)}>{tabName}</Tab>;
                })}
            </div>
            <div className={cn(style.burger_ingredients_scroll_container, "custom-scroll")} onScroll={onScrollCategory}>
                {ingredientsCategories.map((category, index) => {
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
    className: PropTypes.string
}

export default BurgerIngredients;