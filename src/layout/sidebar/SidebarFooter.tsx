import { useAppDispatch } from '@/hooks/useRedux'
import { getAuthLogOut } from '@/http'
import { logout } from '@/store/auth/authSlice'
import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function SidebarFooter() {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logOut = () => {
    setIsLoading(true)

    getAuthLogOut()
      .then(() => {
        dispatch(logout())
        navigate('/')
        toast.success('Tizimdan chiqdizgiz!')
      })
      .catch(() => toast.error('Tizimdan chiqishda xatolik!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="sidebar__footer">
      <Button onClick={logOut} loading={isLoading}>
        Chiqish
      </Button>
    </div>
  )
}

export default SidebarFooter
