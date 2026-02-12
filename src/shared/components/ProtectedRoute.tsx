import { selectedAuthData, useStoreAuth } from '@/store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const authData = useStoreAuth(selectedAuthData)

  return !!authData ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
