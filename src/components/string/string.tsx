import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import stylesString from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [arrString, setArrString] = useState<string[]>([]);

  const onClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const string = e.target.value;
    const arrayOfStrings = string.split("");
    setArrString(arrayOfStrings);
  };

  // console.log(arrString);
  return (
    <SolutionLayout title="Строка">
      <main className={stylesString.main}>
        <form className={stylesString.form}>
          <Input maxLength={11} isLimitText onChange={onClick} />
          <Button text="Развернуть" />
        </form>
        <ul className={stylesString.list}>
          {arrString?.map((item) => (
            <li className={stylesString.circle}>
              <Circle letter={item} />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
