# 架构说明

## 运行环境

- 框架：Vite + React 19 + TypeScript。
- 路由：React Router，使用 `BrowserRouter`。
- 样式：全局 CSS 位于 `src/index.css`，项目中存在 Tailwind 配置。
- 应用挂载：`index.html` 加载 `/src/main.tsx`，再由其渲染 `src/App.tsx`。

## 主要入口

- `src/main.tsx`：React 根节点挂载。
- `src/App.tsx`：路由树和全局 Provider。
- `src/components/SiteLayout.tsx`：共享页面框架。
- `src/components/SiteHeader.tsx`：导航、主题、语言和登录控件。
- `src/components/SiteFooter.tsx`：页脚链接和法律信息导航。

## 目录职责

- `src/pages/`：路由级页面。
- `src/pages/tools/`：具体工具实现和通用框架。
- `src/pages/games/`：小游戏实现。
- `src/components/`：共享 UI 和交互组件。
- `src/data/`：静态产品数据，包括塔罗牌、古籍、知识图解、工具、游戏和百科。
- `src/lib/`：本地可复现演示算法、持久化、登录 API 封装、主题/语言上下文。
- `public/`：静态图片和塔罗资源。
- `dist/`：生成的构建产物。

## 数据与渲染流程

1. 静态数据定义导航、工具、游戏、古籍、百科、图解、塔罗和地点搜索。
2. 路由页面选择并转换静态数据。
3. 工具页面将用户输入与本地可复现函数结合。
4. 会员锁定模块包裹更深入的解读文本。
5. 主题、语言、收藏和登录状态通过 `localStorage` 持久化。

## 外部依赖

- `index.html` 引用了 Google Fonts。
- 登录接口预期位于 `/api/auth/*`。
- Vite 开发服务器将 `/api` 代理到 `http://127.0.0.1:8080`。

## 生成内容与历史内容边界

- `dist/` 为自动生成内容，不应手工编辑。
- `node_modules/` 为第三方依赖输出，不应提交，也不应将其中内容当作产品逻辑分析。

## 已知技术债

- 没有已记录的生产部署。
- 没有 CI 工作流。
- 当前工作目录中没有真实后端。
- 直接打开构建后的文件无法可靠运行。
- 演示计算逻辑与面向用户的产品文案混合在一起。
- 部分页面有完整交互，很多工具仍是框架占位。

## 演进方向

- 将当前源代码保留为功能清单的依据。
- 优先重构产品信息架构。
- 扩展前先完成一条高质量核心流程。
- 新设计方向获批后，再提炼可长期使用的设计 Token 和交互规则。
