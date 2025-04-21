import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { appReducer, appSlice } from './app-slice.ts';
import { authApi } from '../features/auth/api/auth-api.ts';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [appSlice.name]: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
});

// Types for hooks useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)