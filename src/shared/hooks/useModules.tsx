// hooks/useModules.ts
import { getModules, ModuleData } from '@/services'
import { useEffect, useState } from 'react'

export function useModules() {
  const [modules, setModules] = useState<ModuleData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModules({}).then((res) => {
      setModules(res.data)
      setLoading(false)
    })
  }, [])

  return { modules, loading }
}
