import { configureStore } from '@reduxjs/toolkit';
import { catalogReducer } from './slices/catalogSlice';
import { comparedReducer } from './slices/comparedSlice';
import { productReducer } from './slices/productSlice';
import { searchReducer } from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    compared: comparedReducer,
    product: productReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
