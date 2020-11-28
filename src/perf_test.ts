import { Boggler, loadDictionary } from "./boggler";

const TWO_32 = Math.pow(2, 32);

(async () => {
  const dict = await loadDictionary('../performance-boggle/words');
  const boggler = new Boggler(dict);

  let prime = (1 << 20) - 3;
  let totalScore = 0;
  let hash = 0;
  let numBoards = 0;
  const bases = ["abcdefghijklmnop", "catdlinemaropets"];

  const startMs = Date.now();

  for (let _rep = 0; _rep < 10; _rep++) {
    hash = 1234;
    for (const base of bases) {
      boggler.parseBoard(base);
      for (let y1 = 0; y1 < 4; y1++) {
        for (let y2 = 0; y2 < 4; y2++) {
          for (let c1 = 0; c1 < 26; c1++) {
            boggler.setCell(1, y1, c1);
            for (let c2 = 0; c2 < 26; c2++) {
              boggler.setCell(2, y2, c2);
              const score = boggler.score();
              hash *= 123 + score;
              hash = (hash % prime);
              hash = hash % TWO_32;
              totalScore += score;
              numBoards++;
            }
          }
        }
      }
    }
  }

  const elapsedMs = Date.now() - startMs;

  console.log('Total score:', totalScore, '=', totalScore/numBoards, 'pts/bd');
  console.log('Score hash:', hash.toString(16));
  console.log('Evaluated', numBoards, 'in', (elapsedMs / 1000), 'seconds =', numBoards / elapsedMs * 1000, 'bds/sec');
})().catch(e => {
  console.error(e);
});
