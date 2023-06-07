import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  userApi,
  ForgotPayloadType,
  LoginPayloadType,
  LogoutResType,
  ProfileType,
  RegPayloadType,
  SetNewPasswordPayLoadType,
  UpdatedProfileType,
  UpdatePayloadType,
} from "features/user/userApi";
import { toast } from "react-toastify";

//THUNKS =================================================================================================

const registerTC = createAppAsyncThunk("auth/register", async (arg: RegPayloadType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await userApi.register(arg);
    toast.success("🦄 Successful!");
    return { res };
  });
});

const loginTC = createAppAsyncThunk<{ profile: ProfileType }, LoginPayloadType>(
  "auth/login",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await userApi.login(arg);
      toast.success("🦄 You are successfully logged in!");
      return { profile: res.data };
    });
  }
);

const forgotTC = createAppAsyncThunk("auth/forgot", async (arg: ForgotPayloadType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await userApi.forgot(arg);
    return { res };
  });
});

const logoutTC = createAppAsyncThunk<LogoutResType>("auth/logout", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await userApi.logout();
    toast.success("🦄 Logout successful!");
    return res.data;
  });
});

const updateUserTC = createAppAsyncThunk<{ profile: UpdatedProfileType }, UpdatePayloadType>(
  "auth/updateUser",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await userApi.updateUser(arg);
      toast.success("🦄 Successful!");
      return { profile: res.data };
    });
  }
);

export const isAuthTC = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/isAuth",
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await userApi.isAuth();
        return { profile: res.data };
      },
      false
    );
  }
);

export const setPasswordTC = createAppAsyncThunk(
  "auth/setPassword",
  async (arg: SetNewPasswordPayLoadType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await userApi.setNewPassword(arg);
      toast.success("🦄 Successful!");
      return { res };
    });
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isAuthTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(loginTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(setPasswordTC.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(updateUserTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile.updatedUser;
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isAuth = false;
      });
  },
});

export const userReducer = slice.reducer;
export const userActions = slice.actions;

// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const userThunks = {
  registerTC,
  loginTC,
  updateUserTC,
  isAuthTC,
  logoutTC,
  forgotTC,
  setPasswordTC,
};
