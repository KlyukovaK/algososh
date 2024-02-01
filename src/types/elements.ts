import { ElementStates } from "./element-states";

export type TArrString = {
  element: string | number| null;
  color: ElementStates | undefined;
  key: string | number | null;
};

export type TArr = {
  element: number;
  color: ElementStates | undefined;
  key: string | number | null;
};
