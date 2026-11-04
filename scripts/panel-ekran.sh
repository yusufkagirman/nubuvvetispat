#!/usr/bin/env bash
# Kontrol paneli için: akış verisini derler, sunucuyu başlatır, her beat'in ekran görüntüsünü ve docs/sunum-haritasi.md'yi üretir.
# Kullanım: scripts/panel-ekran.sh [beat-id-regex]   (örn. '^zemin\.' ile yalnız bir bölge)
set -euo pipefail
K="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-8131}"
"$K/scripts/hazirla.sh"
( cd "$K/site" && exec python3 -m http.server "$PORT" >/dev/null 2>&1 ) &
SUNUCU=$!
trap 'kill $SUNUCU 2>/dev/null || true' EXIT
sleep 1
node "$K/scripts/panel-ekran.js" "http://localhost:$PORT" "${1:-}"
