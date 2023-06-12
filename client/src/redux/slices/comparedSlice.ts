import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ComparedState = {
  activeTab: string;
  filter: string;
  controllers: any[];
};

const initialState: ComparedState = {
  activeTab: '',
  filter: 'All',
  controllers: [],
};

export const comparedSlice = createSlice({
  name: 'compared',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload.toLowerCase();
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    addController: (state, action: PayloadAction<any>) => {
      state.controllers.push(action.payload);
    },
  },
});

export const { setActiveTab, addController, setFilter } = comparedSlice.actions;
export const comparedReducer = comparedSlice.reducer;
