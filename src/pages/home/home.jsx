import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import style from './home.module.css';

import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/reducers/ingredientsReducer';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
export default function Home({ ingredientsUrl }) {
    const dispatch = useDispatch();
    const { ingredients, ingredientsRrror } = useSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(getIngredients(ingredientsUrl));
    }, [ingredientsUrl, dispatch]);

    if (ingredientsRrror) {
        alert('Произошла ошибка при загрузке данных. Пожалуйста, обратитесь в техническую поддержку.');
    }

    return (
        <div className={style.home_container}>
            {ingredients.length !== 0 && (
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients className='mr-10 mt-10' />
                    <BurgerConstructor className='mt-25' />
                </DndProvider>
            )}
        </div>
    )
}