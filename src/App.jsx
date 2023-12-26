import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { Routes, Route, useLocation } from 'react-router-dom';
import { Login, Home, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, Ingredient, NotFound } from './pages';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';
import { MainLayout, ProfileLayout } from './layouts';

import { checkUserAuth } from './services/reducers/userReducer';

function App({ ingredientsUrl }) {
  const location = useLocation();
  const from = location.state && location.state.from;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={location}>
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
    </>
  );
}

App.propTypes = {
  ingredientsUrl: PropTypes.string.isRequired
}

export default App;
