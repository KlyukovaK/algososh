import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styleStack from "./stack-page.module.css";
import { Stack } from "./stack-class";
import { TArr } from "../../types/elements";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { stop } from "../../utils/stop";
import { useForm } from "../../utils/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const newStack = new Stack<TArr>();
  const [stack] = useState<Stack<TArr>>(newStack);
  const [elements, setElements] = useState<Array<TArr>>([]);
  const { values, handleChange, setValues } = useForm({ input: "" });

  const addState = async () => {
    const newElement: TArr = {
      element: values.input,
      key: nanoid(5),
      index: stack.getSize(),
      color: ElementStates.Changing,
    };
    stack.push(newElement);
    setElements([...stack.getElements()]);
    await stop(SHORT_DELAY_IN_MS);
    const newElementColore: TArr = {
      element: values.input,
      key: nanoid(5),
      index: stack.getSize() - 1,
      color: ElementStates.Default,
    };
    stack.changeColor(newElementColore);
    setElements([...stack.getElements()]);
    setValues({ input: "" });
  };

  const deleteElement = async () => {
    const lastElement = stack.peak();
    if (lastElement) {
      lastElement.color = ElementStates.Changing;
      stack.changeColor(lastElement);
      setElements([...stack.getElements()]);
    }
    await stop(SHORT_DELAY_IN_MS);
    stack.pop();
    setElements([...stack.getElements()]);
  };

  const clean = (): void => {
    stack.clearElements();
    setElements([...stack.getElements()]);
  };

  return (
    <SolutionLayout title="Стек">
      <main className={styleStack.main}>
        <form className={styleStack.form}>
          <div className={styleStack.addStack}>
            <Input
              type="text"
              name="input"
              isLimitText
              maxLength={4}
              onChange={handleChange}
              value={values.input}
            />
            <Button
              text="Добавить"
              onClick={addState}
              disabled={!values.input }
            />
            <Button
              text="Удалить"
              onClick={deleteElement}
              disabled={stack.getSize()===0}
            />
          </div>
          <Button
            text="Очистить"
            onClick={clean}
            disabled={stack.getSize()===0}
          />
        </form>
        <ul className={styleStack.list}>
          {elements.map((item) => (
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
