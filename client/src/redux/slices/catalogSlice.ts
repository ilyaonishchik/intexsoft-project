import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Filter, PriceFilter } from '../../types';

type CatalogState = {
  count: number;
  page: number;
  take: number;
  sortBy: string;
  order: string;
  price: PriceFilter;
  filters: Filter[];
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
  filters: [],
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
    setPrice: (state, action: PayloadAction<PriceFilter>) => {
      state.price = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filter[]>) => {
      state.filters = action.payload;
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const filterIndex = state.filters.findIndex(item => item.name === action.payload);
      state.filters[filterIndex].opened = !state.filters[filterIndex].opened;
    },
    changeFilter: (state, action: PayloadAction<{ name: string; values: string[] }>) => {
      const filterIndex = state.filters.findIndex(item => item.name === action.payload.name);
      state.filters[filterIndex].values = action.payload.values;
    },
    clearFilters: state => {
      state.price.from = state.price.min;
      state.price.to = state.price.max;
      state.filters.forEach(filter => {
        filter.opened = false;
        filter.values = [];
      });
    },
  },
});

export const {
  setCount,
  setPage,
  setTake,
  setSortBy,
  setOrder,
  setPrice,
  setFilters,
  toggleFilter,
  changeFilter,
  clearFilters,
} = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
