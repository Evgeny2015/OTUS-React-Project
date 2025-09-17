import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk, RtkState } from './'

// local storage token name
const LS_TOKEN = 'token'

const tokenSlice = createSlice({
  name: 'token',
  initialState: localStorage.getItem(LS_TOKEN),
  reducers: {
    clear: () => null,
    set: (_, action: PayloadAction<string>) => action.payload
  },
});
export const tokenActions = tokenSlice.actions;

export const tokenSelectors = {
  get: (state: RtkState): RtkState['token'] => {
    return state.token;
  },
  authenticated: (state: RtkState): boolean => {
    return state.token !== null;
  }
};

const clearWithSaving = (): AppThunk => (dispatch) => {
  dispatch(tokenActions.clear());
  localStorage.removeItem(LS_TOKEN);
};

const setToken = (token: string): AppThunk => (dispatch) => {
  dispatch(tokenActions.set(token));
  localStorage.setItem(LS_TOKEN, token);
};

export const tokenThunks = {
  clear: clearWithSaving,
  setToken,
};

export const token = tokenSlice.reducer;