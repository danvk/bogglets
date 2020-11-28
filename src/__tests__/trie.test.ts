import { assert } from "console";
import { Trie } from "../trie";

describe('Trie', () => {
  it('should find words in a shallow Trie', () => {
    const t = new Trie();
    t.addWord('a');
    t.addWord('b');

    expect(t.startsWord('a')).toBeTruthy();
    expect(t.startsWord('b')).toBeTruthy();
    expect(t.startsWord('c')).toBeFalsy();

    expect(t.numNodes()).toEqual(3);
    expect(t.numWords()).toEqual(2);
  });

  it('should add full words', () => {
    const t = new Trie();
    t.addWord("agriculture");
    t.addWord("culture");
    t.addWord("boggle");
    t.addWord("tea");
    t.addWord("sea");
    t.addWord("teapot");

    expect(t.numWords()).toEqual(6);

    expect(t.isWord("agriculture")).toBeTruthy();
    expect(t.isWord("culture")).toBeTruthy();
    expect(t.isWord("boggle")).toBeTruthy();
    expect(t.isWord("tea")).toBeTruthy();
    expect(t.isWord("teapot")).toBeTruthy();
    expect(!t.isWord("teap")).toBeTruthy();
    expect(!t.isWord("random")).toBeTruthy();
    expect(!t.isWord("cultur")).toBeTruthy();
  });
});
