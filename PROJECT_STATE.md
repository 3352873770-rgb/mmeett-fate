# 项目状态

最后更新：2026-08-04

## 权威来源

- 权威项目目录：`/Users/leon/Downloads/fate-web`
- Git 分支：`master`
- 远程仓库：腾讯 Git，文档中有意省略凭据
- 项目包：`cesuan-web` `0.0.0`
- 运行入口：`src/main.tsx` -> `src/App.tsx`
- 本地预览：`npm run dev -- --host 127.0.0.1`，预期地址为 `http://127.0.0.1:5176/`
- 生产环境地址：当前工作目录中没有记录
- 部署路径：未知

## 当前产品

MMEETT Fate 是一个基于 Vite + React 的东方命理产品前端原型，目前包括：

- 当前代码中的首页保留品牌首屏，并按已确认的静态网页方向重建每日一卦、古籍横滑翻卡、4 个左右交替热门推演、五类问题入口和结果可信度模块。
- 已确认的新首页方向记录在 `docs/homepage-function-map.md`：全局导航、今日命理场、意图推荐区、回访与每日使用、结果可信度展示、更多探索和页脚。
- 推演平台包含 28 个工具入口，分为命盘、卜筮、分析和实用工具。
- 11 个 A 级交互工具，使用本地演示逻辑。
- 17 个 B 级框架工具，使用通用表单/结果模板。
- 人格图谱、关系实验室、4 个小游戏、48 本古籍、百科词条和 10 张知识图解。
- 主题切换、语言切换、本地收藏、登录弹窗和会员锁定的深度解读模块。

## 架构边界

- 源代码位于 `src/`。
- 静态资源位于 `public/`。
- 构建产物位于 `dist/`，不应手工编辑。
- 大多数领域计算是 `src/lib` 和 `src/data` 中可复现的本地演示逻辑。
- 登录依赖 `/api/auth/*`，由开发服务器代理到 `http://127.0.0.1:8080`；当前工作目录不包含后端。
- 当前不支持直接双击 HTML 使用，因为 Vite 构建产物使用根相对资源路径，同时项目使用 `BrowserRouter`。

## 已知风险

- `dist/index.html` 不能作为可靠的独立离线文件使用。
- 领域算法和解读大多为演示或模拟数据，不能宣称达到生产级命理准确度。
- 登录和会员功能只是 UI/API 占位，尚无已记录的后端部署。
- 当前没有 CI 工作流。
- 尚未记录生产部署和回滚流程。
- 范围较大：当前产品混合了核心推演工具、内容库、人格、关系和游戏。重构需要更严格的优先级控制。
- `npm run check` 可以通过，但 oxlint 在 `src/components/PersonaDepth.tsx`、`src/lib/auth.tsx`、`src/lib/i18n.tsx` 和 `src/lib/theme.tsx` 中报告 4 个 Fast Refresh 警告。

## 当前工作包

当前启用的规划工作包：`fate-rebuild`

- PRD：`.claude/prds/fate-rebuild.md`
- Epic：`.claude/epics/fate-rebuild/epic.md`
- 任务：`.claude/epics/fate-rebuild/001.md` 至 `.claude/epics/fate-rebuild/008.md`
- 功能图：`docs/fate-function-map.md`
- 首页功能图：`docs/homepage-function-map.md`
- 标准检查命令：`npm run check`

## 后续步骤（按顺序）

1. 根据后续设计反馈继续微调首页视觉与文案。
2. 选择第一条核心工具路径，作为首页推荐区和结果可信度层的样板。
3. 决定现在是否需要后端登录/会员功能，或继续推迟处理。
4. 第一阶段重构完成后增加 CI，并记录发布与回滚流程。

## 当前本地验证

- `npm run check`：已于 2026-08-04 通过。
- 当前暂时接受的 Lint 警告：4 个 Fast Refresh `only-export-components` 警告。
- 构建产物已生成到 `dist/`。
- 本地开发服务已运行于 `http://127.0.0.1:5176/`。
- 首页已在 1440 × 900 和 390 × 844 视口完成真实浏览器验收：无横向溢出、控制台无错误；每日详解点击展开、古籍桌面滚动横移与移动端横滑、热门工具左右交替、滚轮视差和问题入口悬停进度线均已验证。热门工具间距实测为桌面 288px、移动端 144px。
- 首页层级留白已在 745 × 726、1440 × 900 和 390 × 844 视口复验：Banner 文案中心偏差为 0px；745px 审阅视口中 Banner 到每日一卦为 160px、每日一卦到古籍区为 192px、古籍标题到卡片为 107px。

## 新维护者阅读顺序

1. `AGENTS.md`
2. `docs/fate-function-map.md`
3. `docs/homepage-function-map.md`
4. `PROJECT_STATE.md`
5. `docs/PRD.md`
6. `docs/ROADMAP.md`
7. `docs/ARCHITECTURE.md`
8. `.claude/epics/fate-rebuild/epic.md`
