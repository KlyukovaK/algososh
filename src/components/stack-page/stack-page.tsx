import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styleStack from "./stack-page.module.css";
import { Stack } from "./stack-class";
import { TArrString } from "../../types/elements";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { stop } from "../../utils/stop";

export const StackPage: React.FC = () => {
  const newStack = new Stack<TArrString>();
  const [value, setValue] = useState<string>();
  const [stack, setStack] = useState<Stack<TArrString>>(newStack);
  const [reverseString, setReverseString] = useState<Array<TArrString>>([]);

  const onClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setValue(val);
  };

  const addState = async () => {
    const newElement: TArrString = {
      element: value,
      key: nanoid(5),
      index: stack.getSize(),
      color: ElementStates.Changing,
    };
    stack.push(newElement);
    setReverseString([...stack.getElements()]);
    await stop(1000);
    const newElementColore: TArrString = {
      element: value,
      key: nanoid(5),
      index: stack.getSize() - 1,
      color: ElementStates.Default,
    };
    stack.changeColor(newElementColore);
    setReverseString([...stack.getElements()]);
    setValue("");
  };

  const deleteElement = async () => {
    const lastElement = stack.peak();
    if (lastElement) {
      lastElement.color = ElementStates.Changing;
      stack.changeColor(lastElement);
      setReverseString([...stack.getElements()]);
    }
    await stop(1000);
    stack.pop();
    setReverseString([...stack.getElements()]);
  };

  const clean = (): void => {
    stack.clearElements();
    setReverseString([...stack.getElements()]);
  };

  return (
    <SolutionLayout title="Стек">
      <main className={styleStack.main}>
        <form className={styleStack.form}>
          <div className={styleStack.addStack}>
            <Input
              type="text"
              isLimitText
              maxLength={4}
              onChange={onClick}
              value={value}
            />
            <Button text="Добавить" onClick={addState} />
            <Button text="Удалить" onClick={deleteElement} />
          </div>
          <Button text="Очистить" onClick={clean} />
        </form>
        <ul className={styleStack.list}>
          {reverseString.map((item) => (
            <li className={styleStack.circle} key={item.key}>
              <Circle
                letter={item.element}
                index={item.index}
                head={item.key === stack.peak()?.key ? "top" : null}
                state={item.color}
              />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
