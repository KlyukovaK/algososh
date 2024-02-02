import { ElementStates } from "./element-states";

export type TArrString = {
  element: string | number | null | undefined;
  color: ElementStates | undefined;
  key: string | number | null;
  index?: number;
};

export type TArr = {
  element: number;
  color: ElementStates | undefined;
  key: string | number | null;
};
