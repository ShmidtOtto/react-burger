import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Login, Home, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, Ingredient, NotFound } from './pages';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';
import { MainLayout, ProfileLayout } from './layouts';

import { getIngredients } from './services/reducers/ingredientsReducer';

import { checkUserAuth } from './services/reducers/userReducer';
import Modal from './components/modals/modal/modal';

function App({ ingredientsUrl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredientsRrror } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients(ingredientsUrl));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (ingredientsRrror) {
    alert('Произошла ошибка при загрузке данных. Пожалуйста, обратитесь в техническую поддержку.');
  }

  const location = useLocation();
  const background = location.state && location.state.background;

  const closeIngredientModal = () => {
    navigate(-1)
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/ingredients/:id' element={<Ingredient />} />
          <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path='/profile' element={<OnlyAuth component={<ProfileLayout />} />}>
            <Route index element={<OnlyAuth component={<Profile />} />} />
            <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders />} />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<Modal modalTitle="Детали ингредиента" close={closeIngredientModal}><Ingredient /></Modal>} />
        </Routes>
      )}
    </>
  );
}

App.propTypes = {
  ingredientsUrl: PropTypes.string.isRequired
}

export default App;
