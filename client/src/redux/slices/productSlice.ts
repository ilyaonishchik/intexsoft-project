import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types';

type ProductState = {
  product: Product | null;
};

const initialState: ProductState = {
  product: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
