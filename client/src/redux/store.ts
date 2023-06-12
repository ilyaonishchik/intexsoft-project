import { configureStore } from '@reduxjs/toolkit';
import { catalogReducer } from './slices/catalogSlice';
import { comparedReducer } from './slices/comparedSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    compared: comparedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
