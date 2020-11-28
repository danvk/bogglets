# BoggleTS

See also [performance-boggle][C++] and [rusty-boggle][].

Performance test:

    $ ts-node src/perf_test.ts
    Total score: 22925120 = 105.97781065088758 pts/bd
    Score hash: c1d3d
    Evaluated 216320 in 4.366 seconds = 49546.49564819056 bds/sec

    $ node --version
    v12.16.3

vs. the [C++][] version of this project:

    ./4x4/perf_test
    Loaded 172203 words into 385272-node Trie
    Trie contains 273917 childless nodes, 60848 words w/ children
    Total score: 22925120 = 105.977811 pts/bd
    Score hash: 0x000C1D3D
    Evaluated 216320 boards in 0.914723 seconds = 236486.913575 bds/sec
    ./4x4/perf_test: All tests passed!

So using Node is a ~5x slowdown.

[C++]: https://github.com/danvk/performance-boggle
[rusty-boggle]: https://github.com/danvk/rusty-boggle
