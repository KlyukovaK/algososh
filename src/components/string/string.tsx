import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import stylesString from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { TArr } from "../../types/elements";
import { swap } from "../../utils/swap";
import { stop } from "../../utils/stop";
import { useForm } from "../../utils/useForm";
import { addArr } from "../../utils/addArr";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<Array<TArr>>([]);
  const [isLoader, setIsLoader] = useState(false);
  const { values, handleChange } = useForm({ input: "" });

  useEffect(() => {
    const arrayOfStrings = values.input.split("");
    const newArr = addArr(arrayOfStrings);
    setString(newArr);
  }, [values.input]);

  // Изменение цвета
  const changeColor = (type: string, startIndex: number, endIndex: number) => {
    if (type === "start") {
      string[startIndex].color = string[endIndex].color =
        ElementStates.Changing;
    }
    if (type === "finish") {
      string[startIndex].color = string[endIndex].color =
        ElementStates.Modified;
    }
  };

  // Изменение положения элементов с анимацией
  const reverse = async () => {
    const mid = Math.round(string.length / 2);
    for (let i: number = 0; i < mid; i++) {
      const endIndexElement = string.length - i - 1;
      changeColor("start", i, endIndexElement);
      setString([...string]);
      await stop(DELAY_IN_MS); // остановка
      swap(string, i, endIndexElement);
      setString([...string]);
      await stop(DELAY_IN_MS); // остановка
      changeColor("finish", i, endIndexElement);
      setString([...string]);
    }
  };

  const reverseString = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoader(true);
    await reverse();
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <main className={stylesString.main}>
        <form className={stylesString.form}>
          <Input
            data-testid="input"
            name="input"
            maxLength={11}
            isLimitText
            onChange={handleChange}
            value={values.input}
          />
          <Button
            data-testid="button-reverse"
            text="Развернуть"
            isLoader={isLoader}
            onClick={reverseString}
            disabled={!values.input}
          />
        </form>
        <ul className={stylesString.list}>
          {string.map((item) => (
            <li
              data-testid="circle"
              className={stylesString.circle}
              key={item.key}
            >
              <Circle letter={item.element} state={item.color} />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
