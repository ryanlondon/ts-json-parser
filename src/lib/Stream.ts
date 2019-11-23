export interface IStream {
  readonly position: number;
  peek: () => string;
  next: () => string;
  eof: () => boolean;
  readWhile: (predicate: (char: string) => boolean) => string;
}

export class Stream implements IStream {
  private string: string;
  position: number;

  constructor(string: string) {
    this.position = 0;
    this.string = string;
  }

  peek = () => this.string[this.position];
  next = () => this.string[this.position++];
  eof = () => this.peek() === undefined;

  readWhile = (predicate: Function) => {
    let string = "";
    while (!this.eof() && predicate(this.peek())) {
      string += this.next();
    }
    return string;
  };
}
