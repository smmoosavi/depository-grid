#!/usr/bin/env bash

PEGTS=./node_modules/ts-pegjs/dist/tspegjs.js

convert() {
  FILE=$1
  CONFIG=$2
  SRC=$FILE.pegjs
  OUT=$FILE.ts

  pnpm exec peggy --plugin $PEGTS --format es --extra-options-file "$CONFIG" --output "$OUT" "$SRC"
  # find `this.constructor = child;` and insert `// @ts-ignore` before it
  sed -i 's/this\.constructor = child;/\/\/ @ts-ignore\nthis\.constructor = child;/' "$OUT"
  pnpm exec prettier --write "$OUT"
}

CONFIG=./src/lib/editor/state/parser/peggy-config.json
FILE1=./src/lib/editor/state/parser/num-pattern-parser
FILE2=./src/lib/editor/state/parser/char-pattern-parser

convert $FILE1 $CONFIG
convert $FILE2 $CONFIG
