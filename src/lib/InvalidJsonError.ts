export default class InvalidJsonError extends Error {
  constructor(position: number) {
    super(`Invalid JSON at position ${position}`);
  }
}
