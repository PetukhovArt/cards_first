import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appReducer } from "app/appSlice";
import { userReducer } from "features/user/userSlice";
import { packsReducer } from "features/packs/packsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    packs: packsReducer,
    // cards: cardsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // .concat(logger),
  // thunkMiddleware идет по умолчанию, поэтому его не обязательно добавлять
  // Store has all the default middleware added, _plus_ the logger middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
