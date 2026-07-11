import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import styles from './app.module.css';

import {
  AppHeader,
  FeedInfo,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProfileMenu
} from '@components';
import { Preloader } from '@ui';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../../src/services/store';
import { fetchIngredients } from '../../../src/services/slices/ingredientsSlice';

const App = () => {
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = false;
  const location = useLocation();
  const background = location.state?.background;
  console.log(location);
  const ingredients = [];
  const error = null;
  const navigate = useNavigate();
  function handleModalClose() {
    navigate(-1);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  });
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile-orders' element={<ProfileOrders />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed/:id' element={<OrderInfo />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal onClose={handleModalClose} title='Детали ингредиента'>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:id'
              element={
                <Modal onClose={handleModalClose} title='Детали заказа'>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
