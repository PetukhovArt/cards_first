import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAuthTC } from "features/auth/authSlice";

export type isLoadingType = "loading" | "failed" | "success" | "idle";
export type ErrorType = string | null | undefined;

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as ErrorType,
    resStatus: "idle" as isLoadingType,
    isAppInitialized: false,
  },
  reducers: {
    setResStatus: (state, action: PayloadAction<{ resStatus: isLoadingType }>) => {
      state.resStatus = action.payload.resStatus;
    },
    setError: (state, action: PayloadAction<{ error: ErrorType }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(isAuthTC.rejected, (state, action: PayloadAction<ErrorType>) => {
      state.error = action.payload;
    });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
