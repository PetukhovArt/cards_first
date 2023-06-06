import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks: (par: GetPacksParamsType) => {
    return instance.get<PacksResType>("cards/pack", {
      params: {
        packName: par.packName,
        min: par.min,
        max: par.max,
        sortPacks: par.sortPacks,
        page: par.page,
        pageCount: par.pageCount,
        user_id: par.userId,
      },
    });
  },
  addPack: (payload: AddPackPayloadType) => {
    return instance.post("cards/pack", { payload });
  },
  deletePack: (id: string) => {
    return instance.delete(`cards/pack?id=${id}`);
  },
  updatePack: (payload: UpdatePackPayloadType) => {
    return instance.put("cards/pack", { payload });
  },
};

//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========
export type AddPackPayloadType = {
  name?: string; // если не отправить будет "no Name"
  deckCover?: string; // не обязателен  url/base64
  private?: boolean; // если не отправить будет false
};

export type UpdatePackPayloadType = {
  _id: string;
  name?: string;
};

export type GetPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  userId?: string;
};

export type CardPackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};
export type PacksResType = {
  cardPacks: CardPackType[];
  page: number; //выбранная страница
  pageCount: number; //количество эл-ов на странице
  cardPacksTotalCount: number; //количество колод
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
