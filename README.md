# BoggleTS

Performance test:

    $ ts-node src/perf_test.ts
    Total score: 22925120 = 105.97781065088758 pts/bd
    Score hash: f3415
    Evaluated 216320 in 4.484 seconds = 48242.64049955397 bds/sec

    $ node --version
    v12.16.3

vs. the C++ version of this project:

    ./4x4/perf_test
    Loaded 172203 words into 385272-node Trie
    Trie contains 273917 childless nodes, 60848 words w/ children
    Total score: 22925120 = 105.977811 pts/bd
    Score hash: 0x000C1D3D
    Evaluated 216320 boards in 0.914723 seconds = 236486.913575 bds/sec
    ./4x4/perf_test: All tests passed!

Obviously the stats don't match up, but using Node is a ~5x slowdown.

