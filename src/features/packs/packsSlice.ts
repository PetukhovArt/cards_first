import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { CardPackType, GetPacksParamsType, packsApi, PacksResType } from "features/packs/packsApi";

//THUNKS =================================================================================================

export const fetchCardPacksTC = createAppAsyncThunk<{ packs: PacksResType }, GetPacksParamsType>(
  "auth/register",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks(arg);
      return { packs: res.data };
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
