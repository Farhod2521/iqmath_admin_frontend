import { Layout, Drawer } from 'antd'
import SidebarMenu from '../sidebar/SidebarMenu'
import DrawerProfile from './DrawerProfile'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { selectCollapsed, selectTheme, toggleCollapsed } from '@/store/theme/themeSlice'

function DrawerWrapper() {
  const collapsed = useAppSelector(selectCollapsed)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  return (
    <Drawer
      placement="left"
      width="80%"
      open={collapsed}
      onClose={() => dispatch(toggleCollapsed())}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      <Layout.Sider
        collapsedWidth={0}
        trigger={null}
        className={`cs-aside !w-full h-full !max-w-none transition-all ${
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
