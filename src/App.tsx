import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@reducers/hooks';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Login, Home, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, Ingredient, NotFound, Feed, FeedOrder, ProfileOrder, OrderCart } from './pages';
import { OnlyAuth, OnlyUnAuth } from '@components/protected-route';
import { MainLayout, ProfileLayout } from './layouts';

import { getIngredients } from '@reducers/ingredientsReducer';

import { checkUserAuth } from '@reducers/userReducer';
import Modal from '@components/modals/modal/modal';

interface IAppProps {
  ingredientsUrl: string
}

function App({ ingredientsUrl }: IAppProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ingredientsRrror } = useAppSelector(state => state.ingredients);

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

  const closeModal = () => {
    navigate(-1)
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/ingredients/:id' element={<Ingredient />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<FeedOrder />} />
          <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path='/profile' element={<OnlyAuth component={<ProfileLayout />} />}>
            <Route index element={<OnlyAuth component={<Profile />} />} />
            <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders />} />} />
          </Route>
          <Route path='/profile/orders/:number' element={<OnlyAuth component={<ProfileOrder />} />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      
      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<Modal modalTitle="Детали ингредиента" close={closeModal}><Ingredient /></Modal>} />
          <Route path='/profile/orders/:number' element={<Modal modalTitle="" close={closeModal}><OrderCart /></Modal>} />
          <Route path='/feed/:number' element={<Modal modalTitle="" close={closeModal}><OrderCart /></Modal>} />
        </Routes>
      )}
    </>
  );
}

export default App;
