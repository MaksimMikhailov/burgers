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

import { AppHeader, ProfileMenu } from '@components';
import { Preloader } from '@ui';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../../src/services/store';
import { fetchIngredients } from '../../../src/services/slices/ingredientsSlice';

const App = () => {
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = false;
  const ingredients = [];
  const error = null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  });
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile-orders' element={<ProfileOrders />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
