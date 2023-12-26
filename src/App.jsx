import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Login, Home, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, Ingredient, NotFound } from './pages';
import IngredientDetails from './components/modals/ingredient-details/ingredient-details';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';
import { MainLayout, ProfileLayout } from './layouts';

import { checkUserAuth } from './services/reducers/userReducer';
import Modal from './components/modals/modal/modal';

function App({ ingredientsUrl }) {
  const location = useLocation();
  const from = location.state && location.state.from;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const closeIngredientModal = () => {
    navigate(-1)
  }

  return (
    <>
      <Routes location={from || location}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home ingredientsUrl={ingredientsUrl} />} />
          <Route path='/ingredients/:id' element={<Ingredient ingredientsUrl={ingredientsUrl} />} />
          <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path='/profile' element={<ProfileLayout />}>
            <Route index element={<OnlyAuth component={<Profile />} />} />
            <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders />} />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>

      {from && (
        <Routes>
          <Route path='/ingredients/:id' element={<Modal modalTitle="Детали ингредиента" close={closeIngredientModal}><IngredientDetails /></Modal>} />
        </Routes>
      )}
    </>
  );
}

App.propTypes = {
  ingredientsUrl: PropTypes.string.isRequired
}

export default App;
