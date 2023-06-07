import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  AddPackPayloadType,
  CardPackType,
  GetPacksParamsType,
  packsApi,
  PacksResType,
  UpdatePackPayloadType,
} from "features/packs/packsApi";
import { toast } from "react-toastify";

//THUNKS =================================================================================================

export const fetchCardPacksTC = createAppAsyncThunk<{ packs: PacksResType }, GetPacksParamsType>(
  "packs/getPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks(arg);
      return { packs: res.data };
    });
  }
);
export const addCardPackTC = createAppAsyncThunk(
  "packs/addPack",
  async (arg: AddPackPayloadType, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.addPack(arg); //добавляем пак
      await dispatch(fetchCardPacksTC({})); //фетчим по новой
    });
  }
);
export const deleteCardPackTC = createAppAsyncThunk(
  "packs/deletePack",
  async (arg: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.deletePack(arg);
      await dispatch(fetchCardPacksTC({}));
    });
  }
);
export const updateCardPackTC = createAppAsyncThunk(
  "packs/deletePack",
  async (arg: UpdatePackPayloadType, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.updatePack(arg);
      await dispatch(fetchCardPacksTC({}));
    });
  }
);

//REDUCER =================================================================================================

const packsInitialState = {
  cardPacks: [] as CardPackType[],
  cardPacksTotalCount: null as number | null,
  maxCardsCount: null as number | null,
  minCardsCount: null as number | null,
  page: null as number | null, // выбранная страница
  pageCount: null as number | null, // количество элементов на странице
};

const slice = createSlice({
  name: "packs",
  initialState: packsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCardPacksTC.fulfilled, (state, action) => {
      state.cardPacks = action.payload.packs.cardPacks;
      state.cardPacksTotalCount = action.payload.packs.cardPacksTotalCount;
      state.maxCardsCount = action.payload.packs.maxCardsCount;
      state.minCardsCount = action.payload.packs.minCardsCount;
      state.page = action.payload.packs.page;
      state.pageCount = action.payload.packs.pageCount;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = {
  fetchCardPacksTC,
};
