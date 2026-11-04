#!/usr/bin/env bash
# Yayın için: icerik/akis/*.json -> site/akis-veri.js (window.AKIS_VERI), public/gorseller -> site/gorseller.
# Her ikisi de .gitignore'dadır. Bağlantı denetimi (kırık git/sonraki/varsayilan) uyarı olarak yazılır, hata vermez.
set -euo pipefail
K="$(cd "$(dirname "$0")/.." && pwd)"
rm -rf "$K/site/gorseller" "$K/site/icerik" "$K/site/akis-veri.js"
mkdir -p "$K/site/gorseller"
[ -d "$K/public/gorseller" ] && cp -r "$K/public/gorseller/." "$K/site/gorseller/"
python3 -I - "$K" <<'PY'
import json, glob, os, sys
K = sys.argv[1]
sira = ['acilis', 'zemin', 'haber', 'samimiyet', 'fetanet', 'mucize', 'kapanis', 'genel']  # bilinmeyen bölge dosyaları bunlardan sonra, ada göre gelir
dosyalar = sorted(glob.glob(os.path.join(K, 'icerik/akis/*.json')), key=lambda f: (sira.index(os.path.basename(f)[:-5]) if os.path.basename(f)[:-5] in sira else 99, f))
bolgeler, ids = [], {}
for f in dosyalar:
    try:
        b = json.load(open(f, encoding='utf-8'))
    except Exception as e:
        print(f'UYARI: {os.path.basename(f)} okunamadı: {e}'); continue
    if not isinstance(b, dict):
        print(f'UYARI: {os.path.basename(f)} bir nesne değil, atlandı'); continue
    bolgeler.append(b)
    for beat in b.get('beats', []) or []:
        if not isinstance(beat, dict) or 'id' not in beat:
            print(f'UYARI: {os.path.basename(f)} içinde id\'siz beat atlandı'); continue
        if beat['id'] in ids: print(f"UYARI: yinelenen beat id {beat['id']}")
        ids[beat['id']] = beat
for i, beat in ids.items():
    hedefler = [beat.get(k) for k in ('sonraki', 'varsayilan')] + [d.get('git') for d in beat.get('dallan', [])] + [y.get('git') for y in beat.get('yollar', [])]
    for h in filter(None, hedefler):
        if h not in ids: print(f'UYARI: {i} -> {h} (beat yok)')
for b in bolgeler:
    for g in b.get('globalYollar', []) or []:
        for h in filter(None, [g.get('git'), (g.get('tekrar') or {}).get('git')]):
            if h not in ids: print(f"UYARI: globalYollar {g.get('ad')} -> {h} (beat yok; yerleşik sabit metin kullanılır)")
with open(os.path.join(K, 'site/akis-veri.js'), 'w', encoding='utf-8') as o:
    o.write('window.AKIS_VERI = ' + json.dumps({'bolgeler': bolgeler}, ensure_ascii=False) + ';\n')
print(f'Hazır: {len(dosyalar)} bölge, {len(ids)} beat.')
PY
echo "Görseller: $(find "$K/site/gorseller" -type f | wc -l)"
