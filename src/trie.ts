const CHAR_A = 'a'.charCodeAt(0);

export function idx(char: string): number {
  return char.charCodeAt(0) - CHAR_A;
}

export class Trie {
  isWord_: boolean;
  children: (Trie | undefined)[];

  constructor() {
    this.isWord_ = false;
    this.children = Array.from({length: 26});
  }

  addWord(word: string) {
    if (word) {
      const i = idx(word);
      let child = this.children[i];
      if (!child) {
        this.children[i] = child = new Trie();
      }
      child.addWord(word.slice(1));
    } else {
      this.isWord_ = true;
    }
  }

  startsWord(c: string): boolean {
    return !!this.children[idx(c)];
  }

  isWord(word: string): boolean {
    if (!word) return this.isWord_;
    const c = this.children[idx(word)];
    if (!c) {
      return false;
    }
    return c.isWord(word.slice(1));
  }

  numWords(): number {
    return (this.isWord_ ? 1 : 0) + this.children.map(c => c?.numWords() ?? 0).reduce((a, b) => a + b);
  }

  numNodes(): number {
    return 1 + this.children.map(c => c?.numNodes() ?? 0).reduce((a, b) => a + b);
  }
}
