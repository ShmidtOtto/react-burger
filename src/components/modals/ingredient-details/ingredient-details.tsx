import { useAppSelector } from '@reducers/hooks';

import cn from 'classnames';
import style from './ingredient-details.module.css';

interface DetailsProps {
    title: string;
    value: number;
    className?: string
}
function Details({ title = '', value = 0, className = '' }: DetailsProps): React.JSX.Element {
    return (
        <div className={`${style.ingredient_detail} ${className}`}>
            <p className="text text_type_main-default text_color_inactive mb-2">{title}</p>
            <p className="text text_type_digits-default text_color_inactive">{value}</p>
        </div>
    )
}

function IngredientDetails(): React.JSX.Element {
    const { image, name, proteins, fat, carbohydrates, calories } = useAppSelector(state => state.ingredientDetails);
    return (
        <div className={cn(style.ingredient_details_container)}>
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

export default IngredientDetails;