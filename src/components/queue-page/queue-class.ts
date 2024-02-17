interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getSize: () => number;
  isEmpty: () => boolean;
  getElements: () => (T | null)[];
  clearElements: () => void;
  getHead: () => number;
  getTail: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    delete this.container[this.head % this.size];
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  getSize = () => this.container.length;

  isEmpty = () => this.length === 0;

  getElements = (): (T | null)[] => {
    return this.container;
  };

  clearElements = (): void => {
    this.container = Array(this.size);
    this.tail = 0;
    this.head = 0;
    this.length = 0;
  };

  getHead = (): number => this.head % this.size;

  getTail = (): number => this.tail % this.size;
}
