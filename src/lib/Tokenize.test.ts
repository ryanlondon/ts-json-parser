import { Tokenize } from "./Tokenize";

describe("Tokenize", () => {
  describe("All of the basics", () => {
    it("has a 'readString' method", () => {
      const tokenize = new Tokenize("");
      expect(typeof tokenize.readString).toBe("function");
    });

    it("has a 'readNumber' method", () => {
      const tokenize = new Tokenize("");
      expect(typeof tokenize.readNumber).toBe("function");
    });

    it("has a 'readKeyword' method", () => {
      const tokenize = new Tokenize("");
      expect(typeof tokenize.readKeyword).toBe("function");
    });

    it("has a 'readArray' method", () => {
      const tokenize = new Tokenize("");
      expect(typeof tokenize.readArray).toBe("function");
    });

    it("has a 'readObject' method", () => {
      const tokenize = new Tokenize("");
      expect(typeof tokenize.readObject).toBe("function");
    });
  });

  describe("readString method", () => {
    it("tokenizes a simple JSON string", () => {
      const json = JSON.stringify("Hello");
      const tokenize = new Tokenize(json);
      expect(tokenize.readString()).toBe("Hello");
    });

    it("tokenizes a JSON string with escaped double quotes", () => {
      const json = JSON.stringify('My name is "Roger"');
      const tokenize = new Tokenize(json);
      expect(tokenize.readString()).toBe('My name is "Roger"');
    });

    it("tokenizes a JSON string with escaped backslashes", () => {
      const json = JSON.stringify("windows:\\file\\path");
      const tokenize = new Tokenize(json);
      expect(tokenize.readString()).toBe("windows:\\file\\path");
    });
  });

  describe("readNumber method", () => {
    it("tokenizes a JSON integer", () => {
      const json = JSON.stringify(42);
      const tokenize = new Tokenize(json);
      expect(tokenize.readNumber()).toBe(42);
    });

    it("tokenizes a JSON floating point number", () => {
      const json = JSON.stringify(3.141593);
      const tokenize = new Tokenize(json);
      expect(tokenize.readNumber()).toBe(3.141593);
    });
  });

  describe("readKeyword method", () => {
    it("tokenizes a JSON string containing null", () => {
      const json = JSON.stringify(null);
      const tokenize = new Tokenize(json);
      expect(tokenize.readKeyword()).toBe(null);
    });
    it("tokenizes a JSON string containing true", () => {
      const json = JSON.stringify(true);
      const tokenize = new Tokenize(json);
      expect(tokenize.readKeyword()).toBe(true);
    });
    it("tokenizes a JSON string containing false", () => {
      const json = JSON.stringify(false);
      const tokenize = new Tokenize(json);
      expect(tokenize.readKeyword()).toBe(false);
    });
  });

  describe("readArray method", () => {
    it("tokenizes a JSON string containing an empty array", () => {
      const json = JSON.stringify([]);
      const tokenize = new Tokenize(json);
      expect(tokenize.readArray()).toStrictEqual([]);
    });

    it("tokenizes a JSON string containing nested empty arrays", () => {
      const json = JSON.stringify([[[]]]);
      const tokenize = new Tokenize(json);
      expect(tokenize.readArray()).toStrictEqual([[[]]]);
    });
  });
});
