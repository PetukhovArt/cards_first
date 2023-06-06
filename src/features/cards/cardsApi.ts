import { instance } from "common/api/common.api";

export const cardsApi = {
  getCards: (par: GetCardsParamsType) => {
    return instance.get<CardsResType>("cards/card", {
      params: {
        cardAnswer: par.cardAnswer, // не обязательно
        cardQuestion: par.cardQuestion, // не обязательно
        cardsPack_id: par.cardsPackId,
        min: par.min, // не обязательно
        max: par.max, // не обязательно
        sortCards: par.sortCards, // не обязательно
        page: par.page, // не обязательно
        pageCount: par.pageCount, // не обязательно
      },
    });
  },
  addCard: (payload: AddCardPayloadType) => {
    return instance.post("cards/card", { payload });
  },
  deleteCard: () => {
    return instance.delete("cards/card");
  },
  updateCardGrade: (payload: UpdateCardGradePayloadType) => {
    return instance.put<UpdatedGradeType>("cards/grade", { payload });
  },
};

//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========

export type UpdatedGradeType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
};
export type UpdateCardGradePayloadType = {
  grade: number; //1...5
  card_id: string;
};
export type AddCardPayloadType = {
  cardsPack_id: string;
  question?: string; // если не отправить будет таким
  answer?: string; // если не отправить будет таким
  grade?: number; // 0..5, не обязателен
  shots?: number; // не обязателен
  answerImg?: string; // не обязателен  "url or base 64"
  questionImg?: string; // не обязателен
  questionVideo?: string; // не обязателен
  answerVideo?: string; // не обязателен
};
export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: Date;
  updated: Date;
  _id: string;
};
export type CardsResType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
export type GetCardsParamsType = {
  cardAnswer?: string; // не обязательно
  cardQuestion?: string; // не обязательно
  cardsPackId: string; //обязательное чтобы получить колоду
  min?: number; // не обязательно
  max?: number; // не обязательно
  sortCards?: string; // не обязательно
  page?: number; // не обязательно
  pageCount?: number; // не обязательно
};
