import { Navigate, useParams } from 'react-router-dom'
import type { FC } from 'react'
import { ToolShell } from '@/components/ToolShell'
import { toolById } from '@/data/tools'
import { LiuyaoTool } from '@/pages/tools/LiuyaoTool'
import { DailyHexagramTool } from '@/pages/tools/DailyHexagramTool'
import { TarotTool } from '@/pages/tools/TarotTool'
import { BaziTool } from '@/pages/tools/BaziTool'
import { ZiweiTool } from '@/pages/tools/ZiweiTool'
import { ZhugeTool } from '@/pages/tools/ZhugeTool'
import { WuxingTool } from '@/pages/tools/WuxingTool'
import { HecanTool } from '@/pages/tools/HecanTool'
import { BaziHepanTool } from '@/pages/tools/BaziHepanTool'
import { ZiweiHepanTool } from '@/pages/tools/ZiweiHepanTool'
import { BaziDetailTool } from '@/pages/tools/BaziDetailTool'
import { ToolScaffold } from '@/pages/tools/ToolScaffold'
import type { Tool } from '@/data/tools'

const CORE: Record<string, FC> = {
  liuyao: LiuyaoTool,
  'daily-hexagram': DailyHexagramTool,
  tarot: TarotTool,
  bazi: BaziTool,
  ziwei: ZiweiTool,
  zhuge: ZhugeTool,
  wuxing: WuxingTool,
  hecan: HecanTool,
  'bazi-hepan': BaziHepanTool,
  'ziwei-hepan': ZiweiHepanTool,
  'bazi-detail': BaziDetailTool,
}

export function ToolDetailPage() {
  const { id = '' } = useParams()
  const tool = toolById(id)
  if (!tool) return <Navigate to="/tools" replace />

  // 八字 / 每日一卦自管表单与结果页头
  if (tool.id === 'bazi') return <BaziTool />
  if (tool.id === 'daily-hexagram') return <DailyHexagramTool />

  return (
    <ToolShell tool={tool}>
      <ToolBody tool={tool} />
    </ToolShell>
  )
}

function ToolBody({ tool }: { tool: Tool }) {
  const Core = CORE[tool.id]
  if (Core) return <Core />
  return <ToolScaffold tool={tool} />
}
