import { loginUserApi, registerUserApi, TLoginData, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';
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
      });
  }
});
export default authSlice.reducer;
