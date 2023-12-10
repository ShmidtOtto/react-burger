import { useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import PropTypes from 'prop-types';

import cn from 'classnames';
import style from './App.module.css';

import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

import { useDispatch } from 'react-redux';
import { getIngridients } from './services/reducers/ingredientsReducer';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App({ ingridientsUrl }) {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngridients(ingridientsUrl));
  }, [ingridientsUrl, dispatch]);

  return (
    <div className={cn(style.app_container, 'mr-10', 'ml-10')}>
      <AppHeader className='mt-10 mr-10 ml-10' />
      <main className={style.app_container_content}>
        {ingredients.length !== 0 && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients className='mr-10 mt-10'/>
            <BurgerConstructor className='mt-25' />
          </DndProvider>
        )}
      </main>
    </div>
  );
}

App.propTypes = {
  ingridientsUrl: PropTypes.string.isRequired
}

export default App;
