#!/usr/bin/env bash
set -e

cd /workspace

mkdir -p ./.firebase-emulators/state

if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  npm ci --no-audit --no-fund
fi

if [ -d functions ]; then
  if [ ! -d functions/node_modules ] || [ -z "$(ls -A functions/node_modules 2>/dev/null)" ]; then
    npm ci --prefix functions --no-audit --no-fund
  fi

  npm --prefix functions run build
fi

npm run dev -- --host 0.0.0.0 --port 5173 &
VITE_PID=$!

firebase emulators:start \
  --import ./.firebase-emulators/state \
  --export-on-exit ./.firebase-emulators/state &
EMU_PID=$!

trap 'kill -TERM "$VITE_PID" "$EMU_PID" 2>/dev/null' SIGINT SIGTERM

wait -n "$VITE_PID" "$EMU_PID"
exit $?
