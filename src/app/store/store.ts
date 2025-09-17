import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { app, basket, profile, token } from './'
import { AuthApi, OrderApi, ProductApi } from '../api'


export const rtkStore = configureStore({
  reducer: {
    app,
    basket,
    profile,
    token,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(OrderApi.middleware)
      .concat(ProductApi.middleware)
});

setupListeners(rtkStore.dispatch)

export type RtkState = ReturnType<typeof rtkStore.getState>;
export type RtkDispatch = typeof rtkStore.dispatch;
export type ExtraParams = { };
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RtkState, ExtraParams, Action>;