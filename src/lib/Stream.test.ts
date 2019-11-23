import { Stream } from "./Stream";

describe("Stream", () => {
  it("has a 'next' method", () => {
    const stream = new Stream("");
    expect(typeof stream.next).toBe("function");
  });

  it("has a 'peek' method", () => {
    const stream = new Stream("");
    expect(typeof stream.peek).toBe("function");
  });

  it("has a 'eof' method", () => {
    const stream = new Stream("");
    expect(typeof stream.eof).toBe("function");
  });

  it("has a 'readWhile' method", () => {
    const stream = new Stream("");
    expect(typeof stream.readWhile).toBe("function");
  });

  describe("next method", () => {
    it("streams a string correctly", () => {
      const stream = new Stream("cat");
      expect(stream.next()).toBe("c");
      expect(stream.next()).toBe("a");
      expect(stream.next()).toBe("t");
    });

    it("returns undefined after the string has been fully streamed", () => {
      const stream = new Stream("a");
      expect(stream.next()).toBe("a");
      expect(stream.next()).toBe(undefined);
    });
  });

  describe("peek method", () => {
    it("returns the character at the stream's current position", () => {
      const stream = new Stream("dog");
      expect(stream.peek()).toBe("d");
      stream.next();
      expect(stream.peek()).toBe("o");
    });

    it("returns undefined after the string has been fully streamed", () => {
      const stream = new Stream("a");
      stream.next();
      expect(stream.peek()).toBe(undefined);
    });
  });

  describe("eof method", () => {
    it("returns false if there is still more string to be streamed", () => {
      const stream = new Stream("horse");
      expect(stream.eof()).toBe(false);
      stream.next();
      expect(stream.eof()).toBe(false);
    });

    it("returns true when the entire string has been streamed", () => {
      const stream = new Stream("a");
      expect(stream.eof()).toBe(false);
      stream.next();
      expect(stream.eof()).toBe(true);
    });
  });

  describe("readWhile method", () => {
    const isNotASpace = (char: string) => char !== " ";
    it("correctly applies a predicate function while reading the stream", () => {
      const stream = new Stream("hello world");
      const firstWord = stream.readWhile(isNotASpace);
      expect(firstWord).toBe("hello");
    });

    it("recognizes the end of the stream if predicate is never satisfied", () => {
      const stream = new Stream("spöderman");
      const theWord = stream.readWhile(isNotASpace);
      expect(theWord).toBe("spöderman");
    });
  });
});
