import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import stylesString from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { TArrString } from "../../types/elements";
import { swap } from "../../utils/swap";
import { stop } from "../../utils/stop";

export const StringComponent: React.FC = () => {
  const [arrString, setArrString] = useState<string[]>([]);
  const [reverseString, setReverseString] = useState<Array<TArrString>>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

// разбиение стороки на массив
  const onClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const string = e.target.value;
    const arrayOfStrings = string.split("");
    setArrString(arrayOfStrings);
    addArrString(arrayOfStrings);
  };
// Добавление новых элементов со своим цветом и ключем из массива
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

// Изменение цвета
  const changeColor = (type: string, startIndex: number, endIndex: number) => {
    if (type === "start") {
      reverseString[startIndex].color = reverseString[endIndex].color =
        ElementStates.Changing;
    }
    if (type === "finish") {
      reverseString[startIndex].color = reverseString[endIndex].color =
        ElementStates.Modified;
    }
  };

// Изменение положения элементов с анимацией
  const reverse = async () => {
    const mid = Math.round(arrString.length / 2);
    for (let i: number = 0; i < mid; i++) {
      const endIndexElement = arrString.length - i - 1;
      changeColor("start", i, endIndexElement);
      setReverseString([...reverseString]);
      await stop(1000); // остановка
      swap(reverseString, i, endIndexElement);
      setReverseString([...reverseString]);
      await stop(1000); // остановка
      changeColor("finish", i, endIndexElement);
      setReverseString([...reverseString]);
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);
    await reverse();
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <main className={stylesString.main}>
        <form className={stylesString.form} onSubmit={onFormSubmit}>
          <Input maxLength={11} isLimitText onChange={onClick} />
          <Button
            text="Развернуть"
            isLoader={isLoader}
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
