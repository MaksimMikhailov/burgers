import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IInitialState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}
const initialState: IInitialState = {
  ingredients: [],
  loading: false,
  error: null
};
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => await getIngredientsApi()
);
const ingredietnsSlice = createSlice({
  name: 'Ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось получить список ингридиентов';
        state.loading = false;
      });
  }
});
export default ingredietnsSlice.reducer;
