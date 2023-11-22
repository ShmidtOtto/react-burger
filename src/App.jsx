import React, { useEffect, useState } from 'react';
import style from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

const ingridientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
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
    <main className={style.app_container}>
      <AppHeader className='p-10' />
      <div className={style.app_container_content}>
        {ingredients.length !== 0 && (
          <>
            <BurgerIngredients className='mr-10 pt-10' ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
