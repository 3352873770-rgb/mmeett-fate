export type NavItem = {
  to: string
  zh: string
  en: string
}

/** 顶部汉堡菜单的完整导航（对齐参考站） */
export const navItems: NavItem[] = [
  { to: '/', zh: '首页', en: 'Home' },
  { to: '/tools', zh: '推演', en: 'Tools' },
  { to: '/personality', zh: '人格', en: 'Personality' },
  { to: '/relationship-lab', zh: '关系', en: 'Relationships' },
  { to: '/games', zh: '小游戏', en: 'Games' },
  { to: '/classics', zh: '古籍', en: 'Classics' },
  { to: '/wiki', zh: '藏经阁', en: 'Wiki' },
  { to: '/knowledge', zh: '图解', en: 'Diagrams' },
  { to: '/favorites', zh: '收藏', en: 'Saved' },
]

/** 页脚链接（不含联系方式） */
export const footerLinks: NavItem[] = [
  { to: '/tools', zh: '推演', en: 'Tools' },
  { to: '/personality', zh: '人格', en: 'Personality' },
  { to: '/relationship-lab', zh: '关系', en: 'Relationships' },
  { to: '/games', zh: '小游戏', en: 'Games' },
  { to: '/classics', zh: '古籍', en: 'Classics' },
  { to: '/wiki', zh: '藏经阁', en: 'Wiki' },
  { to: '/knowledge', zh: '图解', en: 'Diagrams' },
  { to: '/disclaimer', zh: '免责声明', en: 'Disclaimer' },
]
