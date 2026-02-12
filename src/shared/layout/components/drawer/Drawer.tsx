import { Layout, Drawer } from 'antd'
import SidebarMenu from '../sidebar/SidebarMenu'
import DrawerProfile from './DrawerProfile'
import { useThemeStore } from '@/store'
function DrawerWrapper() {
  // const collapsed = useThemeStore((state) => state.collapsed)
  const theme = useThemeStore((state) => state.currentTheme)
  const setCollapsed = useThemeStore((state) => state.setCollapsed)
  // const collapsed = useAppSelector(selectCollapsed)
  // const dispatch = useAppDispatch()
  // const theme = useAppSelector(selectTheme)
  const collapsed = true

  return (
    <Drawer
      placement="left"
      // width="80%"
      width={300}
      open={collapsed}
      onClose={() => setCollapsed(false)}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      <Layout.Sider
        collapsedWidth={0}
        trigger={null}
        theme="light"
        className={`cs-aside w-full! h-full max-w-none! transition-all ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <DrawerProfile />
        <SidebarMenu />
      </Layout.Sider>
    </Drawer>
  )
}

export default DrawerWrapper
