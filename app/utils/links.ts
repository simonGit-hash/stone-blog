import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: '主页',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: '文章',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: '前端',
  icon: 'i-bxl-codepen',
  to: '/frontend'
}, {
  label: '诗词',
  icon: 'i-lucide-mic',
  to: '/poet'
}
//  {
//   label: '项目',
//   icon: 'i-lucide-folder',
//   to: '/projects'
// },{
//   label: '演讲',
//   icon: 'i-lucide-mic',
//   to: '/speaking'
// }, {
//   label: '关于',
//   icon: 'i-lucide-user',
//   to: '/about'
// }
]
