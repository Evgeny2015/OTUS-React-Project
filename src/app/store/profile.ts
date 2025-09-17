import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RtkState, tokenActions } from '.'
import type { Profile } from '../../entities/model';


const profileSlice = createSlice({
  name: 'profile',
  initialState: (): Profile | null => null,
  reducers: {
    clear: () => null,
    set: (_, action: PayloadAction<Profile>) => action.payload,
  },
extraReducers: (builder) => {
    builder.addCase(tokenActions.clear, () => {
      return null;
    });
  },
});
export const profileActions = profileSlice.actions;

export const profileSelectors = {
  get: (state: RtkState): RtkState['profile'] => {
    return state.profile;
  },
};
export const profile = profileSlice.reducer;