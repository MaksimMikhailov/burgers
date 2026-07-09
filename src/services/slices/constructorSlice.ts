import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { stat } from 'fs';
import reducer from './ingredientsSlice';

interface IInitialState {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
}
const initialState: IInitialState = {
  ingredients: [],
  bun: null
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer(state, action: PayloadAction<TIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload as TConstructorIngredient);
        }
      },
      prepare(ingredient: TIngredient) {
        if (ingredient.type === 'bun') {
          return { payload: ingredient };
        } else {
          return { payload: { ...ingredient, id: Date.now().toString() } };
        }
      }
    },
    delIngredients(state, action) {
      state.ingredients = state.ingredients.filter(
        (el) => el._id !== action.payload
      );
    },
    replaceIngredients(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const elem = state.ingredients.splice(action.payload.fromIndex, 1);
      state.ingredients.splice(action.payload.toIndex, 0, ...elem);
    },
    clearIngredients(state) {
      state.ingredients = [];
      state.bun = null;
    }
  }
});
export default constructorSlice.reducer;
export const {
  addIngredients,
  delIngredients,
  replaceIngredients,
  clearIngredients
} = constructorSlice.actions;
