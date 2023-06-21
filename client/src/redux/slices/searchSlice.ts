import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SearchState = {
  count: number;
  page: number;
  take: number;
  sortBy: string;
  order: string;
};

const initialState: SearchState = {
  count: 0,
  page: 1,
  take: 12,
  sortBy: 'price',
  order: 'desc',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTake: (state, action: PayloadAction<number>) => {
      state.take = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
  },
});

export const { setCount, setOrder, setPage, setSortBy, setTake } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
