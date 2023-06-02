import { createSlice } from "@reduxjs/toolkit";
import {
  authApi,
  ForgotPayloadType,
  LoginPayloadType,
  LogoutResType,
  ProfileType,
  RegPayloadType,
  SetNewPasswordPayLoadType,
  UpdatedProfileType,
  UpdatePayloadType,
} from "features/auth/authApi";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { AxiosError } from "axios";
import { errorUtils } from "common/utils/error-utils";
import { toast } from "react-toastify";

//THUNKS =================================================================================================

const registerTC = createAppAsyncThunk("auth/register", async (arg: RegPayloadType, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.register(arg);
    toast.success("🦄  Registration successful!");
    return { res };
  } catch (e) {
    return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
  }
});
const forgotTC = createAppAsyncThunk("auth/forgot", async (arg: ForgotPayloadType, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.forgot(arg);
    return { res };
  } catch (e) {
    return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
  }
});

const loginTC = createAppAsyncThunk<{ profile: ProfileType }, LoginPayloadType>(
  "auth/login",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.login(arg);
      toast.success("🦄  Login successful!");
      return { profile: res.data };
    } catch (e) {
      return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
    }
  }
);

const logoutTC = createAppAsyncThunk<LogoutResType>("auth/logout", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await authApi.logout();
    toast.success("🦄  Logout successful!");
    return res.data;
  } catch (e) {
    return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
  }
});

const updateUserTC = createAppAsyncThunk<{ profile: UpdatedProfileType }, UpdatePayloadType>(
  "profile/updateUser",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.updateUser(arg);
      return { profile: res.data };
    } catch (e) {
      return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
    }
  }
);

export const isAuthTC = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/isAuth",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.isAuth();
      return { profile: res.data };
    } catch (e) {
      return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
    }
  }
);

export const setPasswordTC = createAppAsyncThunk(
  "auth/isAuth",
  async (arg: SetNewPasswordPayLoadType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.setNewPassword(arg);
      return { res };
    } catch (e) {
      return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
    }
  }
);

//REDUCER =================================================================================================

const authInitialState = {
  profile: null as ProfileType | null,
  isAuth: false,
};

const slice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    // setErrorMessage: (state, action: PayloadAction<{ message: string }>) => {
    //   state.errorMessage = action.payload.message;
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
  registerTC,
  loginTC,
  updateUserTC,
  isAuthTC,
  logoutTC,
  forgotTC,
  setPasswordTC,
};
