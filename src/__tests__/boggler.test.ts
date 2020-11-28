import { bogglifyWord, isBoggleWord } from "../boggler";

describe('boggler', () => {
  it('should identify boggle words', () => {
    expect(!isBoggleWord("")).toBeTruthy();
    expect(!isBoggleWord("f")).toBeTruthy();
    expect(!isBoggleWord("fo")).toBeTruthy();
    expect(isBoggleWord("foo")).toBeTruthy();
    expect(isBoggleWord("quick")).toBeTruthy();
    expect(!isBoggleWord("qick")).toBeTruthy();
    expect(!isBoggleWord("suq")).toBeTruthy();
    expect(isBoggleWord("suqu")).toBeTruthy();
    expect(!isBoggleWord("extremelylongwordmaybgerman")).toBeTruthy();
  });

  it('should bogglify words', () => {
    expect(bogglifyWord("food")).toEqual("food");
    expect(bogglifyWord("quickly")).toEqual("qickly");
    expect(bogglifyWord("suqu")).toEqual("suq");
  });
});
