import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  authApi,
  LoginPayloadType,
  ProfileResponseType,
  RegPayloadType,
} from "features/auth/authApi";
import { AppDispatch, RootState } from "app/store";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

const register = createAppAsyncThunk(
  "auth/register",
  async (arg: RegPayloadType, thunkAPI) => {
    const res = await authApi.register(arg);
  }
);

const login = createAppAsyncThunk<
  { profile: ProfileResponseType }, //return type
  LoginPayloadType // payload type
>("auth/login", async (arg) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
  // возвращаем данные из санки, упаковываем в объект, используем в extraReducers
});

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileResponseType | null,
  },
  reducers: {
    // setProfile(state, action: PayloadAction<{ profile: ProfileResponseType }>) {
    //   state.profile = action.payload.profile;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  },
});

export const authReducer = slice.reducer;
// export const authActions = slice.actions;
// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = { register, login };
