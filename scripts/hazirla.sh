#!/usr/bin/env bash
# Yayın için içerik ve görselleri site/ altına kopyalar (site/icerik, site/gorseller .gitignore'dadır).
set -euo pipefail
K="$(cd "$(dirname "$0")/.." && pwd)"
rm -rf "$K/site/icerik" "$K/site/gorseller"
mkdir -p "$K/site/icerik" "$K/site/gorseller"
[ -d "$K/icerik/dugumler" ] && cp -r "$K/icerik/dugumler/." "$K/site/icerik/"
[ -d "$K/public/gorseller" ] && cp -r "$K/public/gorseller/." "$K/site/gorseller/"
echo "Hazır: $(ls "$K/site/icerik" | wc -l) içerik dosyası, $(find "$K/site/gorseller" -type f | wc -l) görsel."
