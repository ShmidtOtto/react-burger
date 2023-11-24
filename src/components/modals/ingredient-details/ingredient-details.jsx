import cn from 'classnames';
import styles from './ingredient-details.module.css';
function Details({title, value, className}) {
    className = className ? className : '';
    return (
        <div className={`${styles.ingredient_detail} ${className}`}>
            <p className="text text_type_main-default text_color_inactive mb-2">{title}</p>
            <p className="text text_type_digits-default text_color_inactive">{value}</p>
        </div>
    )
}
function IngredientDetails({ image, name, proteins, fat, carbohydrates, calories, className }) {
    return (
        <div className={cn(styles.ingredient_details_container, className)}>
            <img src={image} alt={name} className={`${styles.ingredient_details_container_img} mb-4`}/>
            <p className="text text_type_main-medium mb-8">{name}</p>
            <div className={`${styles.ingredient_detail_container} mb-15`}>
                <Details title="Калории,ккал" value={calories} className="mr-5"/>
                <Details title="Белки, г" value={proteins} className="mr-5"/>
                <Details title="Жиры, г" value={fat} className="mr-5"/>
                <Details title="Углеводы, г" value={carbohydrates}/>
            </div>
        </div>
    )
}

export default IngredientDetails;