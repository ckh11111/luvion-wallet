#!/usr/bin/env bash
# 将 docs/WHITE_PAPER.md 转为 docs/WHITE_PAPER.pdf
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if command -v pandoc &>/dev/null; then
  echo "Using pandoc..."
  (pandoc docs/WHITE_PAPER.md -o docs/WHITE_PAPER.pdf \
    --pdf-engine=pdflatex \
    -V geometry:margin=2.5cm \
    -V fontsize=11pt 2>/dev/null) || pandoc docs/WHITE_PAPER.md -o docs/WHITE_PAPER.pdf
  echo "Done: docs/WHITE_PAPER.pdf"
  exit 0
fi

echo "Pandoc not found. Trying npx md-to-pdf (first run may download Chromium, 1–2 min)..."
if npx --yes md-to-pdf docs/WHITE_PAPER.md --pdf-options '{"format":"A4","margin":"25mm"}' 2>/dev/null; then
  echo "Done: docs/WHITE_PAPER.pdf"
  exit 0
fi

echo "---"
echo "PDF build failed or skipped. Alternatives:"
echo "  1. Install pandoc + LaTeX, then run: pandoc docs/WHITE_PAPER.md -o docs/WHITE_PAPER.pdf"
echo "  2. Open docs/WHITE_PAPER.html in a browser → Print → Save as PDF"
echo "  3. Use any Markdown→PDF tool (e.g. VS Code extension, Typora)"
exit 1
