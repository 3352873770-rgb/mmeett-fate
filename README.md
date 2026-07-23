# MMEETT Fate（cesuan-web）

东方命理推演云台前端。Vite + React 19 + TypeScript + React Router，无后端，假数据 + localStorage。

## 启动

```bash
cd frontend/cesuan-web
npm run dev      # http://localhost:5176
npm run build    # tsc + vite build
npm run lint     # oxlint
```

## 已实现

- **三套皮肤**：昼 / 云海（默认）/ 夜，`html[data-theme]` + localStorage 持久化，右上角切换。
- **中英切换**：`useLang().t(zh, en)`，导航 / 首页 / 页脚 / 关于双语，其余回退中文。
- **13 个主页面**：首页、推演云台、工具详情、人格图谱、关系实验室、小游戏、古籍、图解、关于、联系、登录、收藏、免责 / 隐私。
- **登录 / 会员**：任意账号登录（弹窗 + 独立 `/login`），会员「全能解读」锁 `MemberLock`。
- **27 个推演工具**：
  - A 类（完整交互）：六爻（铜钱动画 + 本卦 / 变卦）、每日一卦、塔罗（翻牌）、八字（四柱 + 五行）、紫微（十二宫）、诸葛神数、五行分析。
  - B 类（统一模板 `ToolScaffold`）：奇门、梅花、大 / 小六壬、测字、解梦、黄历等。
- **小游戏**：今日卡片、每日摇签、红线合拍、塔罗抽牌。
- **古籍书楼**（分类 + 摘读）、**知识图解**（SVG 环形 / 九宫 / 流程）。

## 结构

```
src/
├── components/   # 布局、AuthModal、ToolShell、MemberLock、HexLines、KnowledgeDiagram
├── data/         # tools / tarot / classics / knowledge / zhuge / games / nav
├── lib/          # auth / theme / i18n / favorites + liuyao / bazi / ziwei（假算法）
└── pages/        # 各页面 + pages/tools/ 下的 A 类工具
scripts/download-assets.mjs   # 下载参考站云海图到 public/
```

## 青囊融入（去重）

从 [qingnang.cc](https://www.qingnang.cc/) 并入**独有**能力；与本站已有重叠的排盘工具不重复造：

| 新增 | 路径 |
|------|------|
| 八字合盘 | `/tools/bazi-hepan` |
| 紫微合盘 | `/tools/ziwei-hepan` |
| 八字详批（古籍锚点） | `/tools/bazi-detail` |
| 藏经阁词条 | `/wiki` |
| 解读人格 × 深度 | 各工具结果区（学者/隐士 × 专业/通俗） |

## 说明

- **范围**：功能类；不做会员定价 / 联系方式 / 计费灵签。
- 所有排盘 / 卦象 / 牌意 / 签文均为**确定性演示假数据**，仅供交互体验。
