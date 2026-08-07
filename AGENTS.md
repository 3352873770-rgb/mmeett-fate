# MMEETT Fate Agent 工作规则

## 权威范围

- 权威工作目录：`/Users/leon/Downloads/fate-web`。
- 运行技术栈：Vite、React 19、TypeScript、React Router、Tailwind CSS。
- 当前应用入口：`src/main.tsx` -> `src/App.tsx`。
- 本地开发地址：`http://127.0.0.1:5176/`。
- 本项目目前是一个纯前端原型与重构对象。除非明确提供后端，否则将 `/api/auth/*` 下的后端 API 视为外部依赖。

## 首先阅读的文件

1. `PROJECT_STATE.md`
2. `docs/fate-function-map.md`
3. `docs/homepage-function-map.md`
4. `docs/PRD.md`
5. `docs/ROADMAP.md`
6. `docs/ARCHITECTURE.md`
7. `.claude/prds/fate-rebuild.md`
8. `.claude/epics/fate-rebuild/epic.md`

## 编辑边界

- 不要把 `dist/` 当作源代码修改；应通过源代码重新生成。
- 除诊断本地依赖或运行环境问题外，不扫描或修改 `node_modules/`。
- 仅涉及项目治理的工作，不得改动产品视觉和交互代码。
- 保留工作区中与当前任务无关的已有改动。
- 除非用户对当前任务明确授权，否则不得发布、部署、合并、打标签或推送。

## 质量要求

- 标准本地检查命令：`npm run check`。
- 对 UI 改动而言，仅构建成功还不够。需要启动本地服务，并在桌面端和至少一个窄屏移动端视口中检查真实页面。
- 已接受的警告或失败的检查必须记录在 `PROJECT_STATE.md` 或 `docs/ROADMAP.md` 中，不得隐藏。

## CCPM 工作流

- 需求文档存放在 `.claude/prds/`。
- 实施计划存放在 `.claude/epics/`。
- 如果需要创建分支，每个主要工作包使用一个 Epic 分支：`epic/<name>`。
- 除非用户明确提出，否则不要同步到外部 Issue 跟踪系统。

## 文档更新规则

- 当前状态、入口、风险或后续步骤发生变化时，更新 `PROJECT_STATE.md`。
- 用户可见内容、架构、运维或项目治理发生变化时，更新 `CHANGELOG.md`。
- 仅当某项长期决策值得未来维护者理解、否则需要重新推导时，才在 `docs/decisions/` 下新增决策记录。
