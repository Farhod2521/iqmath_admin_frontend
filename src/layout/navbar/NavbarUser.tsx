import { useNavigate } from 'react-router-dom'
import { Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { ImportOutlined } from '@ant-design/icons'
import user from '@/assets/imgs/frame/user.png'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { logout, selectUserMe } from '@/store/auth/authSlice'

function NavbarUser() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserMe)

  const handleUserLogout = (key: string) => {
    dispatch(logout())
    navigate('/')
  }

  const userItems = [
    {
      label: 'Chiqish',
      key: 'logout',
      icon: <ImportOutlined />,
      hander: handleUserLogout
    }
  ]

  const userMenu: MenuProps['items'] = userItems.map((item) => ({
    key: item.key,
    label: (
      <div onClick={() => item.hander(item.key)}>
        {item.icon} {item.label}
      </div>
    )
  }))

  return (
    <Dropdown menu={{ items: userMenu }} placement="bottomRight">
      <div className="w-14 text-center cursor-pointer hover:bg-gray-100">
        <Avatar src={user} />
      </div>
    </Dropdown>
  )
}

export default NavbarUser
