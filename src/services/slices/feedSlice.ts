import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { clearIngredients } from './constructorSlice';
import { useDispatch } from '../store';

interface IFeed {
  feed: { orders: TOrder[]; total: number; totalToday: number };
  loading: boolean;
  error: string | null;
  orderInfo: TOrder | null;
  userOrders: TOrder[];
  currentOrder: TOrder | null;
}
const initialState: IFeed = {
  feed: { orders: [], total: 0, totalToday: 0 },
  loading: false,
  error: null,
  orderInfo: null,
  userOrders: [],
  currentOrder: null
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
);
export const fetchOrder = createAsyncThunk(
  'feed/fetchOrder',
  async (number: number) => (await getOrderByNumberApi(number)).orders[0]
);
export const fetchOrdersApi = createAsyncThunk(
  'feed/fetchOrdersApi',
  async () => await getOrdersApi()
);
export const fetchOrderBurger = createAsyncThunk(
  'ingredients/fetchOrderBurger',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return { ...response.order, ingredients };
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    closeCurrentOrder(state) {
      state.currentOrder = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось получить список заказов';
        state.loading = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderInfo = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось получить информацию о заказе';
        state.loading = false;
      })
      .addCase(fetchOrdersApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersApi.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersApi.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось получить историю заказов';
        state.loading = false;
      })
      .addCase(fetchOrderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось получить историю заказов';
        state.loading = false;
      });
  }
});
export default feedSlice.reducer;
export const { closeCurrentOrder } = feedSlice.actions;
