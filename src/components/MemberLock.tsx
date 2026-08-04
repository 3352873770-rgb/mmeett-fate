import { PersonaDepth } from '@/components/PersonaDepth'

/** 结果解读区：全开 + 人格×深度切换（青囊四维交互） */
export function MemberLock({ reading, title = '全能解读' }: { reading: string; title?: string }) {
  return <PersonaDepth reading={reading} title={title} />
}
