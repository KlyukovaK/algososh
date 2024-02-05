export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  getSize: () => number;
  toArray: () => Node<T>[];
  deleteHead: () => void;
  deleteTail: () => void;
  deleteByIndex: (index: number) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  private container: Node<T>[] = [];

  constructor() {
    this.head = null;
    this.size = 0;
    this.container = [];
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new Node(element);
      // добавить элемент в начало списка
      if (index === 0) {
        this.prepend(element);
      } else {
        let curr = this.head;
        let currIndex = 0;
        // перебрать элементы в списке до нужной позиции
        if (curr !== null) {
          while (currIndex < index) {
            currIndex++;
            if (curr.next && currIndex !== index) {
              curr = curr.next;
            }
          }
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    let current = node;
    current.next = this.head;
    this.head = node;
    this.size++;
  }

  getSize() {
    return this.size;
  }

  toArray(): Node<T>[] {
    let curr = this.head;
    this.container = [];
    while (curr) {
      this.container.push(curr);
      curr = curr.next;
    }
    return this.container;
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;
    } else {
      return null;
    }
    this.size--;
  }

  deleteTail() {
    let current;
    current = this.head;
    if (current !== null) {
      while (current?.next?.next !== null) {
        current = current?.next;
      }
      if (current?.next !== null) {
        current.next = null;
      }
    }
    this.size--;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      if (index === 0) {
        this.deleteHead();
      } else {
        let curr = this.head;
        let currIndex = 0;
        // перебрать элементы в списке до нужной позиции
        if (curr !== null) {
          while (curr.next !== null) {
            currIndex++;
            if (curr.next && currIndex === index) {
              curr.next = curr.next.next;
            } else {
              curr = curr.next;
            }
          }
        }
      }
      this.size--;
    }
  }
}
