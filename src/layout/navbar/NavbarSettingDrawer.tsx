import { Drawer, MenuTheme, Tooltip } from 'antd'
import dark from '@/assets/icons/dark.svg'
import light from '@/assets/icons/light.svg'
import { CheckOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { selectTheme, setTheme } from '@/store/theme/themeSlice'
import { patchUserMe } from '@/http'

const themeList: Array<any> = [
  { name: 'Dark style', color: '', style: 'dark', icon: dark },
  { name: 'Light style', color: '#2db7f5', style: 'light', icon: light }
]

type ThemeListItemType = {
  color: string
  icon: string
  name: string
  style: MenuTheme
}

type Props = {
  onSetting: () => void
  isSetting: boolean
}

function NavbarSettingDrawer({ onSetting, isSetting }: Props) {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)

  const handleTheme = (item: ThemeListItemType) => {
    const { style } = item
    // const systemTheme = style === 'light' ? 'white' : style
    // const data = { systemTheme }
    // patchUserMe(data).then((res) => {
    dispatch(setTheme(style))
    // })
  }

  return (
    <Drawer width={280} placement="right" open={isSetting} onClose={onSetting} closable={false}>
      <div>
        <h3 className="text-gray-700 mb-2.5 font-semibold">Sahifa ko'rinishi</h3>
        <div className="flex">
          {themeList.map((item) => (
            <span
              className="relative w-12 h-10 mr-4 rounded cursor-pointer"
              key={item.style}
              onClick={() => handleTheme(item)}
            >
              <Tooltip title={item.name} color={item.color} key={item.name}>
                <img className="w-full h-full" src={item.icon} alt="" />
              </Tooltip>

              {theme === item.style ? (
                <CheckOutlined className="absolute right-2.5 bottom-2.5" style={{ color: 'blue' }} />
              ) : (
                ''
              )}
            </span>
          ))}
        </div>
      </div>
    </Drawer>
  )
}

export default NavbarSettingDrawer
