import cn from 'classnames';
import style from './burger-ingredient-category.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientCart from '../burger-ingredients-cart/burger-ingredients-cart';
function BurgerIngredientCategory ({ categoryName, ingredients, className }) {
    return (
        <div className={cn(style.burger_ingridients_categorys_container, className)}>
            <h4 className="text text_type_main-medium mb-6">{categoryName}</h4>
            <div className={`${style.burger_ingridients_category_container}`}>
                {ingredients.map((ingredient) => (
                    <BurgerIngredientCart 
                    key={ingredient._id} 
                    image={ingredient.image}
                    price={ingredient.price} 
                    name={ingredient.name}
                    proteins={ingredient.proteins}
                    fat={ingredient.fat}
                    carbohydrates={ingredient.carbohydrates}
                    calories={ingredient.calories}
                    className="pb-10 pr-4 pt-6 pl-4"
                    />
                ))}
            </div>
        </div>
    );
}

BurgerIngredientCategory.propTypes = {
    categoryName: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired
}

export default BurgerIngredientCategory;