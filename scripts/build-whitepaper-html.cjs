#!/usr/bin/env node
/**
 * 将 docs/WHITE_PAPER.md 转为 docs/WHITE_PAPER.html；
 * 若传入 --en，则使用 docs/WHITE_PAPER_EN.md 生成 docs/WHITE_PAPER_EN.html
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const isEn = process.argv.includes('--en');
const base = isEn ? 'WHITE_PAPER_EN' : 'WHITE_PAPER';
const mdPath = path.join(root, 'docs', base + '.md');
const outPath = path.join(root, 'docs', base + '.html');

let marked;
try {
  marked = require('marked');
} catch (_) {
  console.error('Run: npm install marked');
  process.exit(1);
}

const md = fs.readFileSync(mdPath, 'utf8');
const body = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${isEn ? 'LUVION' : 'LUVION — Technical Whitepaper'}</title>
  <style>
    body { font-family: Georgia, "Times New Roman", serif; max-width: 720px; margin: 2rem auto; padding: 0 2rem; line-height: 1.65; color: #1a1a1a; }
    h1 { font-size: 1.75rem; border-bottom: 1px solid #ccc; padding-bottom: 0.4rem; }
    h2 { font-size: 1.35rem; margin-top: 1.8rem; }
    h3 { font-size: 1.1rem; margin-top: 1.3rem; }
    p { margin: 0.6rem 0; text-align: justify; }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; font-size: 0.9rem; }
    th, td { border: 1px solid #ccc; padding: 0.45rem 0.6rem; text-align: left; }
    th { background: #f2f2f2; }
    ul { margin: 0.4rem 0; padding-left: 1.4rem; }
    strong { font-weight: 600; }
    .meta { font-size: 0.85rem; color: #555; margin-bottom: 1.5rem; }
    .print-hint { font-size: 0.9rem; color: #666; margin-top: 2rem; padding: 0.75rem; background: #f5f5f5; border-radius: 4px; }
    @media print {
      body { max-width: none; }
      .print-hint { display: none; }
      @page { margin: 2cm; size: A4; }
    }
  </style>
</head>
<body>
  ${isEn ? '' : '<p class="meta">Technical Whitepaper (Draft)</p>'}
  <div class="content">${body}</div>
  <p class="print-hint">To save as PDF: <strong>File → Print → Save as PDF</strong>. To remove date/title from each page: in the Print dialog open <strong>More settings</strong> (更多设置) and turn off <strong>Headers and footers</strong> (页眉和页脚).</p>
</body>
</html>
`;

fs.writeFileSync(outPath, html, 'utf8');
console.log('Written: docs/' + base + '.html — open in browser and use Print → Save as PDF');
