import { downloadBase64 } from '@/utils/file'
import { FileDownload as FileDownloadDone } from '@mui/icons-material'
import { Button } from 'antd'
import React from 'react'

type FileDownloadProps = {
  name: string
  title?: string
}

function FileDownloadSimple({ name, title = '' }: FileDownloadProps) {
  return (
    <Button
      disabled={!name}
      onClick={() => downloadBase64(name, 'file')}
      icon={<FileDownloadDone style={{ fontSize: 18 }} />}
    >
      {title}
    </Button>
  )
}

export default FileDownloadSimple
