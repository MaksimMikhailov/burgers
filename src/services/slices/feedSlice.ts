import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeed {
  feed: { orders: TOrder[]; total: number; totalToday: number };
  loading: boolean;
  error: string | null;
  orderInfo: TOrder | null;
}
const initialState: IFeed = {
  feed: { orders: [], total: 0, totalToday: 0 },
  loading: false,
  error: null,
  orderInfo: null
};
export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
);
export const fetchOrder = createAsyncThunk(
  'feed/fetchOrder',
  async (number: number) => (await getOrderByNumberApi(number)).orders[0]
);
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
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
      });
  }
});
export default feedSlice.reducer;
