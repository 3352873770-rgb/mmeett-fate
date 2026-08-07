---
name: fate-rebuild
status: backlog
created: 2026-08-03T04:20:26Z
updated: 2026-08-04T03:04:01Z
progress: 0%
prd: .claude/prds/fate-rebuild.md
github: (will be set on sync)
---

# Epic：fate-rebuild

## 概述

准备并执行 MMEETT Fate 的分阶段重构。工作先从项目治理和产品结构开始，再进入设计，最后实施并验收一段聚焦的第一阶段产品体验。

## 架构决策

- 将 `src/` 作为权威源代码。
- 将 `dist/` 视为生成产物。
- 使用 `docs/homepage-function-map.md` 中用户确认的首页信息架构作为首页设计和实现准则。
- 每个工具完成重新设计前，保留当前数据模块作为可复用清单。
- 未经明确批准，不增加后端范围。

## 技术方案

### 前端组件

- 从 `docs/homepage-function-map.md` 开始设计首页，再进入 `src/pages/HomePage.tsx` 实施。
- 复用 `src/data/tools.ts`、`src/data/games.ts`、`src/data/knowledge.ts`、`src/data/classics.ts` 和 `src/data/wiki.ts` 作为结构化内容来源。
- 首页方向获批后，重构一条核心工具路径。
- 除非重新设计明确替换，否则保留 `ThemeProvider`、`LangProvider`、`AuthProvider` 和收藏功能。

### 后端服务

- 第一规划阶段不包含后端。
- 登录接口继续作为外部占位依赖。

### 基础设施

- 本地 Vite 预览仍是主要验证方式。
- 除非用户要求发布，否则 CI/部署属于后续工作。

## 实施策略

1. 建立可长期维护的项目管理基线。
2. 以 `docs/homepage-function-map.md` 固定第一阶段首页结构。
3. 先产出首页设计稿或页面方案。
4. 实施首页重构。
5. 选择并重构一条核心工具流程。
6. 接入内容可信度层。
7. 增加真实页面验收和发布记录。

## 任务拆分预览

1. 项目治理基线和质量检查命令。
2. 第一阶段范围确认和停放模块清单。
3. 首页信息架构/设计稿。
4. 首页实施。
5. 核心工具流程设计与实施。
6. 内容可信度整合。
7. 响应式与真实页面 UI 验收。
8. 发布准备文档。

## 依赖

- `docs/fate-function-map.md`
- `docs/homepage-function-map.md`
- 用户已确认首页功能结构；视觉方向和代码实施仍需后续确认。
- 本地 Vite 运行环境。
- 可选的登录/会员后端决策。

## 技术成功标准

- `npm run check` 通过。
- 新维护者可以从文档中找到入口、质量检查命令和后续任务。
- 第一条重构流程已在桌面端和移动端本地预览中验证。
- 任何发布前都已经记录发布门槛和回滚方式。

## 工作量预估

中大型。当前项目范围较广，第一段成功交付应保持较小，避免一次性重新设计所有模块。

## 已创建任务

- [ ] 001.md - 确认第一阶段范围（parallel: false）
- [ ] 002.md - 确定首页设计方向（parallel: false）
- [ ] 003.md - 实施首页重构（parallel: false）
- [ ] 004.md - 选择并重构第一条核心工具流程（parallel: true）
- [ ] 005.md - 整合内容可信度层（parallel: true）
- [ ] 006.md - 整理工具优先级（parallel: true）
- [ ] 007.md - 建立真实页面验收基线（parallel: true）
- [ ] 008.md - 发布准备与交接（parallel: false）

任务总数：8
可并行任务：4
顺序任务：4
预计总工作量：37 小时
