import { useAppSelector } from '@reducers/hooks';

import style from './home.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '@components/burger-constructor/burger-constructor';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
export default function Home(): React.JSX.Element {
    const { ingredients } = useAppSelector(state => state.ingredients);

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