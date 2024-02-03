import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styleList from "./list-page.module.css";
import { useForm } from "../../utils/useForm";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./list-class";
import { TArrList } from "../../types/elements";
import { stop } from "../../utils/stop";
import { nanoid } from "nanoid";

export const ListPage: React.FC = () => {
  const newlist = new LinkedList<TArrList>();
  const [list] = useState<LinkedList<TArrList>>(newlist);
  const [elements, setElements] = useState<Array<TArrList>>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const { values, handleChange, setValues } = useForm({
    elementInput: "",
    indexInput: "",
  });
  const [isHead, setIsHead] = useState<boolean>(false);
  const [isTail, setIsTail] = useState<boolean>(false);

  const SmallCircle = (element: string | null | undefined) => {
    if (element) {
      return <Circle letter={element} isSmall state={ElementStates.Changing} />;
    }
    return null;
  };

  // Добавление новых элементов со своим цветом и ключем из массива
  const addArr = (arr: (string | null)[], element: string | null) => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        element: arr[i],
        color: ElementStates.Default,
        head: SmallCircle(element),
        key: nanoid(5),
        tail: SmallCircle(element),
      });
    }
    return newArr;
  };
  const getElementsFromList = () => {
    const el: Array<TArrList> = [];
    list.toArray().map((item) => {
      el.push(item.value);
    });
    setElements([...el]);
  };
  // создание исходного списка
  useEffect(() => {
    if (list.getSize() === 0) {
      const length = Math.random() * (4 - 1) + 1;
      const max = 100;
      const numbers = [];
      for (let i = 0; i < length; i++) {
        numbers[i] = Math.round(Math.random() * max).toString();
      }
      const newArr = addArr(numbers, null);
      newArr.forEach((el) => {
        list.append(el);
      });
      getElementsFromList();
    }
  }, [list.getSize()]);

  // добавление елемента в head
  const addElementHead = async () => {
    setIsLoader(true);
    elements[0] = {
      element: elements[0].element,
      head: SmallCircle(values.elementInput),
      tail: null,
      color: ElementStates.Default,
    };
    await stop(500);
    const newElement: TArrList = {
      element: values.elementInput,
      head: null,
      tail: null,
      key: nanoid(5),
      color: ElementStates.Modified,
    };
    list.prepend(newElement);
    setIsHead(true);
    getElementsFromList();
    await stop(500);
    setIsHead(false);
    setIsLoader(false);
    setValues({ elementInput: "", indexInput: "" });
  };
  // добавление елемента в tail
  const addElementTail = async () => {
    const finalEl = elements.length - 1;
    setIsLoader(true);
    elements[finalEl] = {
      element: elements[finalEl].element,
      head: SmallCircle(values.elementInput),
      tail: null,
      color: ElementStates.Default,
    };
    await stop(500);
    const newElement: TArrList = {
      element: values.elementInput,
      head: null,
      tail: null,
      key: nanoid(5),
      color: ElementStates.Modified,
    };
    list.append(newElement);
    setIsTail(true);
    getElementsFromList();
    await stop(500);
    setIsTail(false);
    setIsLoader(false);
    setValues({ elementInput: "", indexInput: "" });
  };

  // удаление елемента в head
  const deleteElementHead = async () => {
    setIsLoader(true);
    elements[0] = {
      element: "",
      head: "head",
      tail: SmallCircle(String(elements[0].element)),
      color: ElementStates.Default,
    };
    await stop(500);
    list.deleteHead();
    getElementsFromList();
    await stop(500);
    setIsLoader(false);
  };
  // удаление елемента в tail
  const deleteElementTail = async () => {
    setIsLoader(true);
    const finalEl = elements.length - 1;
    elements[finalEl] = {
      element: "",
      head: null,
      tail: SmallCircle(String(elements[finalEl].element)),
      color: ElementStates.Default,
    };
    await stop(500);
    list.deleteTail();
    getElementsFromList();
    await stop(500);
    setIsLoader(false);
  };
  // добавление елемента по индексу
  const addElementByIndex = async () => {
    setIsLoader(true);
    for (let i = 0; i < Number(values.indexInput); i++) {
      elements[i] = {
        element: elements[i].element,
        head: SmallCircle(values.elementInput),
        tail: null,
        color: ElementStates.Changing,
      };
      await stop(500);
    }
    await stop(500);
    const newElement: TArrList = {
      element: values.elementInput,
      head: null,
      tail: null,
      color: ElementStates.Modified,
    };
    list.addByIndex(newElement, Number(values.indexInput));
    getElementsFromList();
    await stop(500);
    setIsLoader(false);
    setValues({ elementInput: "", indexInput: "" });
  };

  // удаление елемента по индексу
  const deleteByIndex = async () => {
    setIsLoader(true);
    list.deleteByIndex(Number(values.indexInput));
    getElementsFromList();
    await stop(500);
    setIsLoader(false);
    setValues({ elementInput: "", indexInput: "" });
  };

  return (
    <SolutionLayout title="Связный список">
      <main className={styleList.main}>
        <form className={styleList.form}>
          <div className={styleList.buttonsList}>
            <Input
              type="text"
              placeholder="Введите значение"
              name="elementInput"
              isLimitText
              maxLength={4}
              onChange={handleChange}
              value={values.elementInput}
            />
            <Button
              text="Добавить в head"
              onClick={addElementHead}
              isLoader={isLoader}
              // disabled={!values.input ? true : false}
            />
            <Button
              text="Добавить в tail"
              isLoader={isLoader}
              onClick={addElementTail}
              // disabled={queue.isEmpty() ? true : false}
            />
            <Button
              text="Удалить из head"
              onClick={deleteElementHead}
              // disabled={!values.input ? true : false}
            />
            <Button
              text="Удалить из tail"
              onClick={deleteElementTail}
              // disabled={queue.isEmpty() ? true : false}
            />
          </div>
          <div className={styleList.buttonsIndex}>
            <Input
              type="number"
              placeholder="Введите индекс"
              name="indexInput"
              isLimitText={false}
              onChange={handleChange}
              value={values.indexInput}
            />
            <Button
              text="Добавить по индексу"
              onClick={addElementByIndex}
              // disabled={!values.input ? true : false}
            />
            <Button
              text="Удалить по индексу"
              onClick={deleteByIndex}
              // disabled={queue.isEmpty() ? true : false}
            />
          </div>
        </form>
        <ul className={styleList.list}>
          {elements.map((item, i) => (
            <li className={styleList.circle} key={i}>
              <Circle
                letter={item.element}
                index={i}
                head={
                  list.getHead()?.value.key === item.key ? "head" : item.head
                }
                tail={
                  list.getTail()?.value.key === item.key ? " tail" : item.tail
                }
                state={
                  (list.getHead()?.value.key === item.key && isHead) ||
                  (list.getTail()?.value.key === item.key && isTail)
                    ? ElementStates.Modified
                    : ElementStates.Default
                }
              />
              {i !== elements.length - 1 && <ArrowIcon />}
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
