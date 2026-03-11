#!/usr/bin/env bash
# 将 docs/WHITE_PAPER.md 转为 docs/WHITE_PAPER.pdf；支持 --en 生成纯英文 PDF
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

EN=""
OUT="docs/WHITE_PAPER.pdf"
SRC="docs/WHITE_PAPER.md"
[[ "${1:-}" == "--en" ]] && { EN=1; OUT="docs/WHITE_PAPER_EN.pdf"; SRC="docs/WHITE_PAPER_EN.md"; }

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
if npx --yes md-to-pdf "$SRC" --pdf-options '{"format":"A4","margin":"25mm"}' 2>/dev/null; then
  echo "Done: $OUT"
  exit 0
fi

echo "---"
echo "PDF build failed or skipped. Alternatives:"
echo "  1. Install pandoc + LaTeX, then run: pandoc $SRC -o $OUT"
echo "  2. Open docs/WHITE_PAPER*.html in a browser → Print → Save as PDF"
echo "  3. Use any Markdown→PDF tool (e.g. VS Code extension, Typora)"
exit 1
