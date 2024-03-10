import { ElementStates } from "./element-states";

export type TArr = {
  element: string | number | null | undefined;
  color: ElementStates | undefined;
  key?: string | number | null;
  index?: number;
};
export type TArrList = TArr & {
  tail?: string | React.ReactElement | null;
  head?: string | React.ReactElement | null;
};
export type TArrSort = {
  element: number | string;
  color: ElementStates | undefined;
  key?: string | number | null;
  index?: number;
};
export type TButton = {
  increasing: boolean;
  descending: boolean;
  addArr: boolean;
};
export type THeadTaile = {
  head: number;
  tail: number;
};
export type TButtonsList = {
  addInHeadButton: boolean;
  addInTailButton: boolean;
  deleteInHeadButton: boolean;
  deleteInTailButton: boolean;
  addByIndexButton: boolean;
  deleteByIndexButton: boolean;
};

export type TButtonsQueue = {
  addButton: boolean;
  deleteButton: boolean;
  cleanButton: boolean;
};