# 组件地图

## 应用框架

| 产品区域 | 文件 |
|---|---|
| 应用路由与 Provider | `src/App.tsx` |
| React 挂载 | `src/main.tsx` |
| 全局样式 | `src/index.css` |
| 页面布局 | `src/components/SiteLayout.tsx` |
| 页头/导航/主题/语言/登录 | `src/components/SiteHeader.tsx` |
| 页脚 | `src/components/SiteFooter.tsx` |
| 品牌标志 | `src/components/BrandMark.tsx` |

## 产品页面

| 产品区域 | 文件 |
|---|---|
| 首页 | `src/pages/HomePage.tsx` |
| 工具索引 | `src/pages/ToolsPage.tsx` |
| 工具路由 | `src/pages/ToolDetailPage.tsx` |
| 人格 | `src/pages/PersonalityPage.tsx` |
| 关系 | `src/pages/RelationshipPage.tsx` |
| 游戏索引 | `src/pages/GamesPage.tsx` |
| 游戏路由 | `src/pages/GameDetailPage.tsx` |
| 古籍索引/详情 | `src/pages/ClassicsPage.tsx`, `src/pages/ClassicDetailPage.tsx` |
| 藏经阁 | `src/pages/WikiPage.tsx` |
| 知识图解 | `src/pages/KnowledgePage.tsx`, `src/components/KnowledgeDiagram.tsx` |
| 收藏 | `src/pages/FavoritesPage.tsx` |
| 关于/法律/登录 | `src/pages/AboutPage.tsx`, `src/pages/LegalPage.tsx`, `src/pages/LoginPage.tsx` |

## 工具组件

| 工具类型 | 文件 |
|---|---|
| 共享工具框架 | `src/components/ToolShell.tsx` |
| 共享出生信息表单 | `src/components/BirthChartForm.tsx`, `src/components/LocationPicker.tsx` |
| 会员锁定 | `src/components/MemberLock.tsx` |
| 卦象显示 | `src/components/HexLines.tsx` |
| 通用 B 级框架 | `src/pages/tools/ToolScaffold.tsx` |
| A 级工具 | `src/pages/tools/BaziTool.tsx`, `src/pages/tools/ZiweiTool.tsx`, `src/pages/tools/BaziDetailTool.tsx`, `src/pages/tools/BaziHepanTool.tsx`, `src/pages/tools/ZiweiHepanTool.tsx`, `src/pages/tools/HecanTool.tsx`, `src/pages/tools/LiuyaoTool.tsx`, `src/pages/tools/TarotTool.tsx`, `src/pages/tools/ZhugeTool.tsx`, `src/pages/tools/WuxingTool.tsx`, `src/pages/tools/DailyHexagramTool.tsx` |

## 小游戏

| 游戏 | 文件 |
|---|---|
| 今日卡片 | `src/pages/games/DailyCardGame.tsx` |
| 每日摇签 | `src/pages/games/DailyLotteryGame.tsx` |
| 红线合拍 | `src/pages/games/RedThreadGame.tsx` |
| 塔罗抽牌 | `src/pages/games/TarotDrawGame.tsx` |

## 数据与逻辑

| 区域 | 文件 |
|---|---|
| 导航 | `src/data/nav.ts` |
| 工具 | `src/data/tools.ts` |
| 游戏 | `src/data/games.ts` |
| 古籍 | `src/data/classics.ts`, `src/data/classicQuotes.ts` |
| 藏经阁 | `src/data/wiki.ts` |
| 知识图解 | `src/data/knowledge.ts` |
| 塔罗牌组 | `src/data/tarot.ts` |
| 诸葛签文 | `src/data/zhuge.ts` |
| 地点查询 | `src/data/locations.ts` |
| 八字逻辑 | `src/lib/bazi.ts` |
| 紫微逻辑 | `src/lib/ziwei.ts` |
| 六爻逻辑 | `src/lib/liuyao.ts` |
| 合盘逻辑 | `src/lib/hepan.ts` |
| 主题/语言/收藏/登录 | `src/lib/theme.tsx`, `src/lib/i18n.tsx`, `src/lib/favorites.ts`, `src/lib/auth.tsx`, `src/lib/api.ts` |

## 不要直接编辑

- `dist/`
- `node_modules/`
- `.DS_Store` files
