import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import stylesString from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";

type TArrString = {
  element: string | undefined | null;
  color: ElementStates | undefined;
  key: string | number | null;
};
export const StringComponent: React.FC = () => {
  const [arrString, setArrString] = useState<string[]>([]);
  const [reverseString, setReverseString] = useState<Array<TArrString>>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const onClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const string = e.target.value;
    const arrayOfStrings = string.split("");
    setArrString(arrayOfStrings);
    addArrString(arrayOfStrings);
  };
  const addArrString = (arr: string[]): void => {
    for (let i = 0; i < arr.length; i++) {
      setReverseString([
        ...reverseString,
        {
          element: arr[i],
          color: ElementStates.Default,
          key: nanoid(5),
        },
      ]);
    }
  };
  const promise = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const reverse = async () => {
    const mid = Math.round(arrString.length / 2);
    for (let i: number = 0; i < mid; i++) {
      const endIndexElement = arrString.length - i - 1;
      const temp = reverseString[i].element;
      reverseString[i].color = ElementStates.Changing;
      reverseString[endIndexElement].color = ElementStates.Changing;
      reverseString[i].element = reverseString[endIndexElement].element;
      reverseString[endIndexElement].element = temp;
      setReverseString([...reverseString]);
      await promise(); // остановка
      reverseString[i].color = ElementStates.Modified;
      reverseString[endIndexElement].color = ElementStates.Modified;
      setReverseString([...reverseString]);
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoader(true);
    await reverse();
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <main className={stylesString.main}>
        <form className={stylesString.form}>
          <Input maxLength={11} isLimitText onChange={onClick} />
          <Button
            text="Развернуть"
            isLoader={isLoader}
            onClick={onFormSubmit}
          />
        </form>
        <ul className={stylesString.list}>
          {reverseString.map((item) => (
            <li className={stylesString.circle} key={item.key}>
              <Circle letter={item.element} state={item.color} />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
