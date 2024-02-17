import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styleQueue from "./queue-page.module.css";
import { TArr, THeadTaile } from "../../types/elements";
import { stop } from "../../utils/stop";
import { Queue } from "./queue-class";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { useForm } from "../../utils/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7));
  const [newArr, setNewArr] = useState<Array<TArr>>([]);
  const [headTail, saetHeadTail] = useState<THeadTaile>({
    head: 0,
    tail: 0,
  });
  const [isChangeColor, setChangeColor] = useState<{
    head: boolean;
    tail: boolean;
  }>({ head: false, tail: false });
  const { values, handleChange, setValues } = useForm({ input: "" });

  // Добавление новых элементов со своим цветом и ключем из массива
  const addArr = (arr: (string | null)[]): void => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        element: arr[i] ? arr[i] : " ",
        color: ElementStates.Default,
        key: nanoid(5),
        index: i,
      });
    }
    setNewArr(newArr);
  };

  useEffect(() => {
    if (queue.isEmpty()) {
      addArr(queue.getElements());
    }
  }, [queue, queue.isEmpty]);

  const addElement = async () => {
    addArr(queue.getElements());
    setChangeColor({ head: false, tail: true });
    const newElement = values.input;
    queue.enqueue(newElement);
    await stop(SHORT_DELAY_IN_MS);
    addArr(queue.getElements());
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    setChangeColor({ head: false, tail: false });
    setValues({ input: "" });
  };

  const deleteElement = async () => {
    setChangeColor({ head: true, tail: false });
    await stop(SHORT_DELAY_IN_MS);
    queue.dequeue();
    addArr(queue.getElements());
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    await stop(SHORT_DELAY_IN_MS);
    setChangeColor({ head: false, tail: false });
  };

  const clean = (): void => {
    queue.clearElements();
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    addArr(queue.getElements());
  };

  return (
    <SolutionLayout title="Очередь">
      <main className={styleQueue.main}>
        <form className={styleQueue.form}>
          <div className={styleQueue.addStack}>
            <Input
              type="text"
              name="input"
              placeholder="Введите значение"
              isLimitText
              maxLength={4}
              onChange={handleChange}
              value={values.input}
            />
            <Button
              text="Добавить"
              onClick={addElement}
              disabled={!values.input}
            />
            <Button
              text="Удалить"
              onClick={deleteElement}
              disabled={queue.isEmpty()}
            />
          </div>
          <Button text="Очистить" onClick={clean} disabled={queue.isEmpty()} />
        </form>
        <ul className={styleQueue.list}>
          {newArr.map((item, i) => (
            <li className={styleQueue.circle} key={item.key}>
              <Circle
                letter={item.element}
                index={item.index}
                head={!queue.isEmpty() && headTail.head === i ? HEAD : null}
                tail={!queue.isEmpty() && headTail.tail - 1 === i ? TAIL : null}
                state={
                  (isChangeColor.tail && headTail.tail === i) ||
                  (isChangeColor.head && headTail.head === i)
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
