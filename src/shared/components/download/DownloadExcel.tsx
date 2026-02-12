import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { axiosApi } from '@/configs/api'

type DownloadExcelProps = {
  url: string
  title?: string
  fileName?: string
}

const btnExcelStyle: React.CSSProperties = {
  background: '#16a34a',
  color: '#fff',
  fontWeight: 500,
  border: 'none',
  transition: 'background 0.2s, color 0.2s'
}
function DownloadExcel(props: DownloadExcelProps) {
  const { url, title = '' } = props

  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      // const res = await axiosApi.get(url, { responseType: 'blob' })
      // const blob = new Blob([res.data], { type: res.headers['content-type'] })
      // const link = document.createElement('a')
      // link.href = window.URL.createObjectURL(blob)
      // link.download = fileName
      // document.body.appendChild(link)
      // link.click()
      // link.remove()
      // window.URL.revokeObjectURL(link.href)
    } catch (e) {
      console.error('Fayl yuklanmadi:', e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button
      loading={loading}
      icon={<DownloadOutlined />}
      style={btnExcelStyle}
      onClick={handleDownload}
      className="hover:!bg-[#15803d] hover:!text-white"
    >
      {title}
    </Button>
  )
}

export default DownloadExcel
