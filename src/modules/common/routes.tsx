import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'

const NotFound = lazy(() => import('./pages/NotFound'))

const CommonRoutes = (
  <>
    <Route path="/login" element={<>Login</>} />
    <Route path="/*" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<NotFound />} />
  </>
)

export default CommonRoutes
