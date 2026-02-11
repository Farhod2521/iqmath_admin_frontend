import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useRedux'
import { actionLogin, actionSapLogin } from '@/store/auth/authActions'
import Loading from '@/components/loading'
import { setSidebarMenu } from '@/store/theme/themeSlice'
import { childRoutes } from '@/router/routes'
import { getUserMe } from '@/http'
import { toast } from 'react-toastify'

function SapCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const getAuth = async () => {
    try {
      const resultAction = await dispatch(actionSapLogin(searchParams.get('id')))

      if (actionLogin.fulfilled.match(resultAction)) {
        if (resultAction.payload?.is_staff) {
          getUserMe()
            .then((res) => {
              const permissions = res?.position?.permissionsList?.map((perm: any) => perm.code) || []
              if (permissions.includes('menu:dashboard')) {
                navigate('/dashboard')
                dispatch(setSidebarMenu({ open: ['menu:dashboard'], select: 'menu:dashboard' }))
              } else {
                const r = childRoutes.find((i) => i.name && permissions.includes(i.name))
                navigate(r?.path || '/dashboard')
                dispatch(setSidebarMenu({ open: [r?.name], select: r?.name }))
              }
            })
            .catch((err) => toast.error(err.response?.data?.message))
        } else {
          navigate('/dashboard')
          dispatch(setSidebarMenu({ open: ['menu:dashboard'], select: 'menu:dashboard' }))
        }
      } else {
        console.error('Login failed:', resultAction)
        navigate('/')
        const { payload }: any = resultAction
        const message = payload?.response?.data?.message
        toast.error(message)
      }
    } catch (error) {
      console.error('error', error)
      navigate('/')
    }
  }

  useEffect(() => {
    getAuth()
  }, [])

  return <Loading />
}
export default SapCallback
