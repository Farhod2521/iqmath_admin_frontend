// components/QueryWrapper.tsx
import React from 'react'

type Props = {
  isLoading: boolean
  error: any
  children: React.ReactNode
}

const QueryWrapper = ({ isLoading, error, children }: Props) => {
  if (isLoading) return <div>⏳ Yuklanmoqda...</div>
  if (error) return <div>❌ Xatolik yuz berdi: {error?.status}</div>
  return <>{children}</>
}

export default QueryWrapper
