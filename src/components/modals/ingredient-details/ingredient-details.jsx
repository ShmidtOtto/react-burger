import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './ingredient-details.module.css';

function Details({ title = '', value = 0, className = '' }) {
    className = className ? className : '';
    return (
        <div className={`${style.ingredient_detail} ${className}`}>
            <p className="text text_type_main-default text_color_inactive mb-2">{title}</p>
            <p className="text text_type_digits-default text_color_inactive">{value}</p>
        </div>
    )
}

Details.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    className: PropTypes.string
}

function IngredientDetails({ image = '', name = '', proteins = 0, fat = 0, carbohydrates = 0, calories = 0, className = '' }) {
    return (
        <div className={cn(style.ingredient_details_container, className)}>
            <img src={image} alt={name} className={`${style.ingredient_details_container_img} mb-4`} />
            <p className="text text_type_main-medium mb-8">{name}</p>
            <div className={`${style.ingredient_detail_container} mb-15`}>
                <Details title="Калории,ккал" value={calories} className="mr-5" />
                <Details title="Белки, г" value={proteins} className="mr-5" />
                <Details title="Жиры, г" value={fat} className="mr-5" />
                <Details title="Углеводы, г" value={carbohydrates} />
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    className: PropTypes.string
}

export default IngredientDetails;