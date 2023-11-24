import { useEffect, useState } from 'react';
import cn from 'classnames';
import style from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  const ingridientsUrl = 'https://norma.nomoreparties.space/api/ingredients';
  
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngridients = () => {
      fetch(ingridientsUrl)
        .then((response) => response.json())
        .then((data) => {
          setIngredients(data.data);
        }).catch((error) => {
          console.log(error);
          alert('Возникла ошибка при получении списка ингридиентов. Пожалуйста обратитесь к администратору сайта');
        });
    }

    getIngridients();
  }, [])

  return (
    <main className={cn(style.app_container, 'mr-10', 'ml-10')}>
      <AppHeader className='mt-10 mr-10 ml-10' />
      <div className={style.app_container_content}>
        {ingredients.length !== 0 && (
          <>
            <BurgerIngredients className='mr-10 mt-10' ingredients={ingredients} />
            <BurgerConstructor className='mt-25' ingredients={ingredients}/>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
