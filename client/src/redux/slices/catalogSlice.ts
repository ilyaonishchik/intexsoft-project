import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Price = {
  min: number;
  max: number;
  from: number;
  to: number;
};

type CatalogState = {
  count: number;
  page: number;
  take: number;
  sortBy: string;
  order: string;
  price: Price;
};

const initialState: CatalogState = {
  count: 0,
  page: 1,
  take: 9,
  sortBy: 'price',
  order: 'desc',
  price: {
    min: 0,
    max: 2000,
    from: 0,
    to: 2000,
  },
};

export const catalogSlice = createSlice({
  name: 'catalog',
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
    setPrice: (state, action: PayloadAction<Price>) => {
      state.price = action.payload;
    },
  },
});

export const { setCount, setPage, setTake, setSortBy, setOrder, setPrice } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
