export const isNumericChar = (char: string) => /[0-9.]/i.test(char);
export const isKeywordChar = (char: string) => /[falsetrun]/.test(char);
