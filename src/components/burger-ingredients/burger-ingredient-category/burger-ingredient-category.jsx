import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './burger-ingredient-category.module.css';

import BurgerIngredientCart from '../burger-ingredients-cart/burger-ingredients-cart';

function BurgerIngredientCategory({ categoryName, ingredients, className }) {
    return (
        <div className={cn(style.burger_ingridients_categorys_container, className)}>
            <h4 className="text text_type_main-medium mb-6">{categoryName}</h4>
            <div className={`${style.burger_ingridients_category_container}`}>
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

BurgerIngredientCategory.propTypes = {
    categoryName: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    className: PropTypes.string
}

BurgerIngredientCategory.defaultProps = {
    categoryName: '',
    ingredients: []
}

export default BurgerIngredientCategory;