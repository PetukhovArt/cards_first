import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "features/counter/counterSlice";
import { appReducer } from "features/app/appSlice";
import { authReducer } from "features/auth/authSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // .concat(logger),
  // thunkMiddleware идет по умолчанию, поэтому его не обязательно добавлять
  // Store has all the default middleware added, _plus_ the logger middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
