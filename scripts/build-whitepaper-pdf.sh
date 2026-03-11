#!/usr/bin/env bash
# 将白皮书 Markdown 转为 PDF
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SRC="docs/WHITE_PAPER.md"
OUT="docs/WHITE_PAPER.pdf"
if [[ "${1:-}" == "--en" ]]; then
  SRC="docs/WHITE_PAPER_EN.md"
  OUT="docs/WHITE_PAPER_EN.pdf"
fi

if command -v pandoc &>/dev/null; then
  echo "Using pandoc..."
  (pandoc "$SRC" -o "$OUT" \
    --pdf-engine=pdflatex \
    -V geometry:margin=2.5cm \
    -V fontsize=11pt 2>/dev/null) || pandoc "$SRC" -o "$OUT"
  echo "Done: $OUT"
  exit 0
fi

echo "Pandoc not found. Trying npx md-to-pdf (first run may download Chromium, 1–2 min)..."
if npx --yes md-to-pdf "$SRC" --output "$OUT" --pdf-options '{"format":"A4","margin":"25mm"}' 2>/dev/null; then
  echo "Done: $OUT"
  exit 0
fi

echo "---"
echo "PDF build failed or skipped. Alternatives:"
echo "  1. Install pandoc + LaTeX, then run: pandoc $SRC -o $OUT"
echo "  2. Open the corresponding HTML in a browser → Print → Save as PDF"
echo "  3. Use any Markdown→PDF tool (e.g. VS Code extension, Typora)"
exit 1
