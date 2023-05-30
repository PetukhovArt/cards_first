import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  authApi,
  LoginPayloadType,
  LogoutResType,
  ProfileType,
  RegPayloadType,
  UpdatedProfileType,
  UpdatePayloadType,
} from "features/auth/authApi";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { appActions } from "features/app/appSlice";
import { AxiosError } from "axios";

//THUNKS =================================================================================================
const registerTC = createAppAsyncThunk(
  "auth/register",
  async (arg: RegPayloadType, thunkAPI) => {
    const res = await authApi.register(arg);
  }
);

const loginTC = createAppAsyncThunk<{ profile: ProfileType }, LoginPayloadType>(
  "auth/login",
  async (arg) => {
    const res = await authApi.login(arg);
    return { profile: res.data };
    // возвращаем данные из санки, упаковываем в объект, используем в extraReducers
  }
);
const logoutTC = createAppAsyncThunk<LogoutResType>("auth/logout", async (arg) => {
  const res = await authApi.logout();
  return res.data;
});
const updateUserTC = createAppAsyncThunk<{ profile: UpdatedProfileType }, UpdatePayloadType>(
  "profile/updateUser",
  async (arg, thunkAPI) => {
    const res = await authApi.updateUser(arg);
    return { profile: res.data };
  }
);
const isAuthTC = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/isAuth",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setIsLoading({ resStatus: "loading" }));
    try {
      const res = await authApi.isAuth();
      dispatch(appActions.setIsLoading({ resStatus: "success" }));
      return { profile: res.data };
    } catch (error) {
      dispatch(appActions.setIsLoading({ resStatus: "failed" }));
      const e = error as AxiosError<{ error: string }>;
      if (e.response && e.response.data && e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      } else {
        return rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

//REDUCER =================================================================================================

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isAuth: false,
  },
  reducers: {
    // setProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
    //   state.profile = action.payload.profile;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(isAuthTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(updateUserTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile.updatedUser;
      });
  },
});

export const authReducer = slice.reducer;

export const authActions = slice.actions;

// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = {
  register: registerTC,
  login: loginTC,
  updateUserTC,
  isAuthTC,
  logoutTC,
};
