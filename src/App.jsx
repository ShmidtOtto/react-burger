import React from 'react';
import ingredients from './utils/data';
import style from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <main className={style.app_container}>
      <AppHeader className='p-10'/>
      <div className={style.app_container_content}>
        <BurgerIngredients className='mr-10 pt-10' ingredients={ingredients}/>
        <BurgerConstructor 
          ingredients={ingredients}
        />
      </div>
    </main>
  );
}

export default App;
