import { useState, useRef, SyntheticEvent } from 'react';
import { useAppSelector } from '@reducers/hooks';

import cn from 'classnames';
import style from './burger-ingredients.module.css';

import ingredientsTranslate from '../../utils/ingredients-translate';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCategory from './burger-ingredient-category/burger-ingredient-category';

interface IBurgerIngredientsProps {
    className?: string
}
function BurgerIngredients({ className = '' }: IBurgerIngredientsProps): React.JSX.Element {
    const [current, setCurrentTab] = useState<string>('Булки');

    const { ingredients, ingredientsCategories } = useAppSelector(state => state.ingredients);

    const tubsRef = useRef<HTMLDivElement>(null)

    const onScrollCategory = (e: SyntheticEvent) => {
        if (!tubsRef.current) return;
        let tubBottom = tubsRef.current.getBoundingClientRect().bottom;
        let categoryPositions = ingredientsCategories.map((category, index) => {
            const target = e.target as HTMLDivElement;
            return {
                category: ingredientsTranslate[category],
                diff: Math.abs(target.children[index].getBoundingClientRect().top - tubBottom)
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
                {
                ingredientsCategories.map((category, index) => {
                    const tabName = ingredientsTranslate[category]
                    return <Tab key={index} value={tabName} active={current === tabName} onClick={() => setCurrentTab(tabName)}>{tabName}</Tab>;
                })}
            </div>
            <div className={cn(style.burger_ingredients_scroll_container, "custom-scroll")} onScroll={onScrollCategory}>
                {
                ingredientsCategories.map((category, index) => {
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