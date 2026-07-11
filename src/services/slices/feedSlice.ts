import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeed {
  feed: { orders: TOrder[]; total: number; totalToday: number };
  loading: boolean;
  error: string | null;
}
const initialState: IFeed = {
  feed: { orders: [], total: 0, totalToday: 0 },
  loading: false,
  error: null
};
export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async () => await getFeedsApi()
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
      });
  }
});
export default feedSlice.reducer;
