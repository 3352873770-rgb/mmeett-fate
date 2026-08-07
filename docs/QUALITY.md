# 质量规范

## 标准本地命令

```bash
npm run check
```

该命令会执行 Lint 和生产构建。

## 现有命令

```bash
npm run dev -- --host 127.0.0.1
npm run lint
npm run build
npm run preview
```

## 必要的 UI 验证

视觉或交互发生变化时：

- 在 `http://127.0.0.1:5176/` 启动本地预览。
- 检查桌面端第一屏。
- 检查至少一个窄屏移动端视口。
- 实际操作本次修改涉及的交互。
- 浏览器工具可用时，检查控制台错误。
- 确认没有明显的文本重叠、控件裁切、资源缺失或激活状态错误。

## 当前缺口

- 没有 CI 工作流。
- 没有自动化真实页面 UI 测试。
- 因为缺少后端，没有后端测试覆盖。
- 没有生产部署验证。
- 不支持直接打开 HTML 文件运行。
- 当前 Lint 有 4 个已暂时接受的 Fast Refresh 警告：
  - `src/components/PersonaDepth.tsx`
  - `src/lib/auth.tsx`
  - `src/lib/i18n.tsx`
  - `src/lib/theme.tsx`

## 完成检查清单

- 只有预期文件发生改动。
- `npm run check` 通过；若失败，必须记录准确原因。
- 产品 UI 改动已完成真实页面验收。
- 状态变化时已更新 `PROJECT_STATE.md` 和 `CHANGELOG.md`。
- 未经用户明确授权不得部署。
