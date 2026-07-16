import { createSlice } from '@reduxjs/toolkit';
interface IInitialState {
  isAuth: boolean;
}
const initialState: IInitialState = { isAuth: false };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});
export default authSlice.reducer;
