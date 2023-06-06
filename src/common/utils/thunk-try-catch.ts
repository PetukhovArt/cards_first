import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";
import { appActions } from "app/appSlice";
import { AxiosError, isAxiosError } from "axios";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, any>,
  //TODO any type
  resolveActions: Function,
  showGlobalError?: boolean
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await resolveActions();
  } catch (e) {
    // const err = e as Error | AxiosError<{ error: string }>;
    // if (isAxiosError(err)) {
    //   const error = err.response ? err.response.data.error : err.message;
    //   dispatch(appActions.setError({ error }));
    // } else {
    //   dispatch(appActions.setError({ error: `Native error ${err.message}` }));
    // }
    return rejectWithValue({ e, showGlobalError });
  }
};
