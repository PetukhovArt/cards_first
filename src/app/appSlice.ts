import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import { stepClasses } from "@mui/material";

export type ErrorType = string | null | undefined;

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as ErrorType,
    isLoading: false as boolean,
    // isAppInitialized: false,
  },
  reducers: {
    setResStatus: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setError: (state, action: PayloadAction<{ error: ErrorType }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/fulfilled");
        },
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/rejected"); // любой экшн с реджектом
        },
        (state, action) => {
          state.isLoading = false; // убираем лоадер
          const { e, showGlobalError = true } = action.payload;
          if (!showGlobalError) return; // если фолс то не показывать toast

          const err = e as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
          toast.error(state.error);
          state.error = "";
        }
      );
    // .addDefaultCase((state, action) => {
    //   console.log("addDefaultCase 🚀", action.type);
    // });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
