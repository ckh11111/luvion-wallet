# Luvion Wallet 构建说明

## 生产包构建（部署 / 本地安装）

在项目根目录执行：

```bash
npm run build:tauri
```

- 会先构建前端到 `dist/`，再编译 Rust 并打出 **macOS .app**。
- 产出路径：`src-tauri/target/release/bundle/macos/Luvion Wallet.app`

## 安装包位置

| 平台   | 路径 |
|--------|------|
| macOS  | `src-tauri/target/release/bundle/macos/Luvion Wallet.app` |

构建完成后，在 Finder 中打开上述目录，双击 **Luvion Wallet.app** 即可运行；或执行：

```bash
npm run open:app
```

（需先执行过一次 `npm run build:tauri`）

## 开发模式

```bash
npm run dev:tauri
```

若端口 1421 被占用，先执行：

```bash
npm run kill-port
```
