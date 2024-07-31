export interface IChatItem {
  id: string;
  role: string;
  content: string;
  fromLang: string;
  toLang: string;
  questionId?: string;
}

export type TChatHistory = {
  history: IChatItem[];
};

export interface ILikedItem {
  id: string;
  fromLang: string;
  toLang: string;
  question: string;
  answer: string;
}

export interface ILikedItemsResponse {
  name: string;
  data: ILikedItem[];
}
