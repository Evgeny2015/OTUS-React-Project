import { createSlice } from '@reduxjs/toolkit'
import type { RtkState } from './'

const appSlice = createSlice({
  name: 'app',
  initialState: false,
  reducers: {
    set: () => true,
  },

});
export const appActions = appSlice.actions;

export const appSelectors = {
  get: (state: RtkState): RtkState['app'] => {

    return state.app;
  },
};
export const app = appSlice.reducer;