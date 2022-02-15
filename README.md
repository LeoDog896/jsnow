# jsnow

A simple runner of JS that executes JS as you type. Located at https://leodog896.github.io/jsnow.

## How?

### Babel

Babel is used to compile both TypeScript and new ES Features, as well as adding implicit checkpoints.

By injecting a debug(lineNumber, value) function at unused values or variables after initializaiton or assignment

Wrapping this in an AsyncFunction constructor also allows for tol-level await.
