import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';
interface IInitialState {
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  user: TUser | null;
}
const initialState: IInitialState = {
  isAuth: false,
  loading: false,
  error: null,
  user: null
};
export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);
export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  const response = await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
  return response.success;
});
export const fetchForgotPassword = createAsyncThunk(
  'auth/fetchForgotPassword',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);
    return response.success;
  }
);
export const fetchResetPassword = createAsyncThunk(
  'auth/fetchResetPassword',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);
    return response.success;
  }
);
export const fetchUserApi = createAsyncThunk('auth/fetchUserApi', async () => {
  const response = await getUserApi();
  return response.user;
});
export const fetchUpdateUserApi = createAsyncThunk(
  'auth/fetchUpdateUserApi',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось зарегистрироваться';
        state.loading = false;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось авторизоваться';
        state.loading = false;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось выйти';
        state.loading = false;
      })
      .addCase(fetchForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось перейти на страницу';
        state.loading = false;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось изменить пароль';
        state.loading = false;
      })
      .addCase(fetchUserApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserApi.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(fetchUserApi.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось изменить пароль';
        state.loading = false;
      })
      .addCase(fetchUpdateUserApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdateUserApi.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUpdateUserApi.rejected, (state, action) => {
        state.error = action.error.message || 'Не удалось изменить пароль';
        state.loading = false;
      });
  }
});
export default authSlice.reducer;
