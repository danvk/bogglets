import fs from 'fs';
import readline from 'readline';
import { Trie } from "./trie";

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

if (require.main === module) {
  (async () => {
    const [, , dictFile] = process.argv;
    const t = await loadDictionary(dictFile);
    console.log('Loaded ', t.numWords(), 'words into', t.numNodes(), 'nodes');
  })().catch(e => {
    console.error(e);
  });
}