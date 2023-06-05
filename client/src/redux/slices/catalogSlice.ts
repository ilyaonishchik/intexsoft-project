import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Price = {
  min: number;
  max: number;
  from: number;
  to: number;
};

type CatalogState = {
  price: Price;
};

const initialState: CatalogState = {
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
    setPrice: (state, action: PayloadAction<Price>) => {
      state.price = action.payload;
    },
  },
});

export const { setPrice } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
