# Luvion 文档

## 白皮书

- **中英版**：`WHITE_PAPER.md` → `npm run docs:html` → 打开 `WHITE_PAPER.html` 打印为 PDF。
- **纯英文版**：`WHITE_PAPER_EN.md` → `npm run docs:html:en` → 打开 `WHITE_PAPER_EN.html` 打印为 PDF。

## 白皮书 PDF

- **Markdown 源码**: `WHITE_PAPER.md`
- **生成 PDF**（任选其一）:
  1. **推荐**：生成 HTML 后浏览器另存为 PDF  
     `npm run docs:html` → 打开 `docs/WHITE_PAPER.html` → 浏览器 **打印 → 另存为 PDF**
  2. 若已安装 **pandoc**（及 LaTeX）：  
     `npm run docs:pdf` 或 `pandoc docs/WHITE_PAPER.md -o docs/WHITE_PAPER.pdf`
  3. 使用 **md-to-pdf**（首次会下载 Chromium）：  
     `npm run docs:pdf`

生成后的 PDF 路径：`docs/WHITE_PAPER.pdf`（通过 pandoc/md-to-pdf）或由浏览器另存得到。
