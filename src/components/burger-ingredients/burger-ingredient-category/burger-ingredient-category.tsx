import cn from 'classnames';
import style from './burger-ingredient-category.module.css';

import BurgerIngredientCart from '../burger-ingredients-cart/burger-ingredients-cart';

import { IIngredient }  from '@interfaces/index';

interface IBurgerIngredientCategoryProps {
    categoryName: string;
    ingredients: Array<IIngredient>;
    className?: string;
}

function BurgerIngredientCategory ({ categoryName = '', ingredients = [], className = '' }: IBurgerIngredientCategoryProps): React.JSX.Element {
    return (
        <div 
            className={cn(style.burger_ingredients_categorys_container, className)}>
            <h4 className="text text_type_main-medium mb-6">{categoryName}</h4>
            <div className={`${style.burger_ingredients_category_container}`}>
                {ingredients.map((ingredient) => (
                    <BurgerIngredientCart
                        key={ingredient._id}
                        {...ingredient}
                        className="pb-10 pr-4 pt-6 pl-4"
                    />
                ))}
            </div>
        </div>
    );
}

export default BurgerIngredientCategory;