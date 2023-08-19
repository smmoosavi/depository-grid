#!/bin/bash
set -e

pnpm run build && pnpm run build:pack
(cd server && cargo build --release --target x86_64-unknown-linux-musl)

cp server/target/x86_64-unknown-linux-musl/release/depository-grid-server ./dist/depository-grid-server-x86_64-unknown-linux-musl
