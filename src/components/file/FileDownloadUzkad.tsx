import { get } from '@/http/request'
import { getFilenameFromContentDisposition } from '@/utils/file'
import { FileDownload as FileDownloadUzkadDone } from '@mui/icons-material'
import { Button } from 'antd'
import axios from 'axios'
import { useState } from 'react'

type FileDownloadUzkadProps = {
  item: any
  title?: string
}

function FileDownloadUzkad({ item, title = '' }: FileDownloadUzkadProps) {
  const [isLoading, setIsLoading] = useState(false)

  const downloadFile = () => {
    setIsLoading(true)
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI
    axios
      .get('/api/v1/uzkad/file', {
        params: { filePath: item.url, ext: item.extension },
        responseType: 'arraybuffer'
      })
      .then((res) => {
        const contentDisposition = res.headers['content-disposition']
        const filename = getFilenameFromContentDisposition(contentDisposition)

        const arrayBuffer = res.data

        const blob = new Blob([arrayBuffer])
        const urlObject = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = urlObject
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(urlObject)
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <Button
      disabled={false}
      loading={isLoading}
      onClick={downloadFile}
      icon={<FileDownloadUzkadDone style={{ fontSize: 18 }} />}
    >
      {title}
    </Button>
  )
}

export default FileDownloadUzkad
