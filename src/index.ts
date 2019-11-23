import { Tokenize } from "./lib/Tokenize";

const parseJson = (json: string) => {
  return new Tokenize(json).readNextToken();
};

export default parseJson;
