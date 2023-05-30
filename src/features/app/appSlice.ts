import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type isLoadingType = "loading" | "failed" | "success" | "idle";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    resStatus: "idle" as isLoadingType,
    isAppInitialized: false,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ resStatus: isLoadingType }>) => {
      state.resStatus = action.payload.resStatus;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
