#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
EXE_PATH="$ROOT_DIR/src-tauri/target/x86_64-pc-windows-gnu/release/tauri-static.exe"

cd "$ROOT_DIR"

# Avoid stale binary confusion.
rm -f "$EXE_PATH"

if [[ -f "$HOME/.cargo/env" ]]; then
  # shellcheck disable=SC1090
  source "$HOME/.cargo/env"
fi

set +e
npm run tauri build -- --target x86_64-pc-windows-gnu
build_rc=$?
set -e

if [[ ! -f "$EXE_PATH" ]]; then
  echo "ERROR: Windows exe was not produced."
  exit ${build_rc:-1}
fi

echo "Windows exe ready: $EXE_PATH"
ls -lh --time-style=long-iso "$EXE_PATH"
sha256sum "$EXE_PATH"

# On Linux cross-builds installer packaging may fail (e.g., missing makensis.exe).
# If exe exists, treat as success for this workflow.
exit 0
