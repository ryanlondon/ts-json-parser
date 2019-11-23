import { Stream } from "./Stream";
import { isNumericChar, isKeywordChar } from "./regexHelpers";
import InvalidJsonError from "./InvalidJsonError";

export interface ITokenize {
  readNextToken: () => number | boolean | string | null | Array<any> | Object;
}

export class Tokenize extends Stream implements ITokenize {
  constructor(json: string) {
    super(json);
  }

  readNextToken = () => {
    if (this.eof()) return null;
    const char = this.peek();

    if (isNumericChar(char)) return this.readNumber();
    if (isKeywordChar(char)) return this.readKeyword();
    if (char === '"') return this.readString();
    if (char === "[") return this.readArray();
    if (char === "{") return this.readObject();
    return null;
  };

  private isClosingChar = (closingChar: string) => {
    if (this.peek() === closingChar) {
      this.next(); // skip closing character
      return true;
    }
    if (this.peek() === ",") {
      this.next(); // skip comma
    }
    return false;
  };

  readString = () => {
    let isEscaped = false;
    let token = "";
    this.next(); // skip opening quote

    while (!this.eof()) {
      const char = this.next();
      if (isEscaped) {
        if (char === '"' || char === "'") token += char;
        if (char === "\\") token += "\\";
        if (char === "n") token += "\n";
        if (char === "r") token += "\r";
        if (char === "t") token += "\t";
        if (char === "b") token += "\b";
        if (char === "f") token += "\f";
        isEscaped = false;
      } else if (char === "\\") {
        isEscaped = true;
      } else if (char === '"') {
        break;
      } else {
        token += char;
      }
    }
    return token;
  };

  readNumber = () => parseFloat(this.readWhile(isNumericChar));

  readKeyword = () => {
    const keyword = this.readWhile(isKeywordChar);
    if (keyword === "true") return true;
    if (keyword === "false") return false;
    if (keyword === "null") return null;

    throw new InvalidJsonError(this.position);
  };

  readArray = () => {
    const token = new Array<any>();
    this.next(); // skip opening square bracket
    while (!this.isClosingChar("]")) {
      token.push(this.readNextToken());
    }
    return token;
  };

  readObject = () => {
    const token: any = {};
    this.next(); // skip opening curly bracket
    while (!this.isClosingChar("}")) {
      const key = this.readNextToken();
      if (typeof key !== "string" || !key.length) {
        throw new InvalidJsonError(this.position);
      }
      this.next(); // skip colon
      const value = this.readNextToken();
      token[key] = value;
    }
    return token;
  };
}
