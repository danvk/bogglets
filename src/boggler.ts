import fs from 'fs';
import readline from 'readline';
import { setFlagsFromString } from 'v8';
import { idx, Trie } from "./trie";

const WORD_SCORES = [ 0, 0, 0, 1, 1, 2, 3, 5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ];
const Q = 'q'.charCodeAt(0) - 'a'.charCodeAt(0);

export function isBoggleWord(word: string): boolean {
  return word.length >= 3 && word.length <= 17 && !word.match(/q([^u]|$)/);
}

export function bogglifyWord(word: string): string {
  return word.replace(/qu/g, 'q');
}

export async function loadDictionary(filename: string): Promise<Trie> {
  const root = new Trie();
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (let line of rl) {
    line = line.trim();
    if (!isBoggleWord(line)) {
      continue;
    }
    line = bogglifyWord(line);
    root.addWord(line);
  }

  return root;
}

export class Boggler {
  dict: Trie;
  bd: number[][];
  runs: number;
  width = 4;
  height = 4;

  constructor(dict: Trie) {
    this.dict = dict;
    this.bd = Array.from({length: 4}).map(() => [0, 0, 0, 0]);
    this.runs = 0;
  }

  setCell(x: number, y: number, i: number) {
    this.bd[x][y] = i;
  }

  getCell(x: number, y: number) {
    return this.bd[x][y];
  }

  parseBoard(board: string) {
    const {width, height} = this;
    if (board.length !== width * height) {
      throw new Error(`Invalid board size: ${board}`);
    }
    for (let i = 0; i < board.length; i++) {
      const c = board.charAt(i);
      if (c < 'a' || c > 'z') {
        throw new Error(`Invalid character on board ${c}`);
      }
      this.setCell(i % width, Math.floor(i / width), idx(c));
    }
  }

  score(): number {
    let score = 0;
    this.runs += 1;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const i = this.getCell(x, y);
        const c = this.dict.children[i];
        if (c) {
          score += this.doDFS(x, y, 0, 0, c);
        }
      }
    }

    return score;
  }

  doDFS(x: number, y: number, len: number, used: number, t: Trie): number {
    let score = 0;
    let c = this.getCell(x, y);
    let i = 4 * x + y;
    used = used ^ (1 << i);
    len += (c === Q ? 2 : 1);

    if (t.isWord_) {
      if (t.mark !== this.runs) {
        t.mark = this.runs;
        score += WORD_SCORES[len];
      }
    }

    for (let dx = -1; dx <= 1; dx++) {
      const cx = x + dx;
      if (cx < 0 || cx >= 4) continue;
      for (let dy = -1; dy <= 1; dy++) {
        const cy = y + dy;
        if (cy < 0 || cy >= 4) continue;
        const idx = 4 * cx + cy;
        if ((used & (1 << idx)) === 0) {
          const cc = this.bd[cx][cy];
          let tc = t.children[cc];
          if (tc) {
            score += this.doDFS(cx, cy, len, used, tc);
          }
        }
      }
    }

    return score;
  }

  toString(): string {
    let out = '';
    for (let y = 0; y <= this.height; y++) {
      for (let x = 0; x <= this.width; x++) {
        out += String.fromCharCode('a'.charCodeAt(0) + this.getCell(x, y));
      }
    }
    return out;
  }
}

if (require.main === module) {
  (async () => {
    const [, , dictFile, board] = process.argv;
    const t = await loadDictionary(dictFile);
    console.log('Loaded ', t.numWords(), 'words into', t.numNodes(), 'nodes');

    const b = new Boggler(t);
    b.parseBoard(board);
    console.log('Score for', board, b.score());
  })().catch(e => {
    console.error(e);
  });
}
