import { IconButton } from '@mui/material'
import { Modal } from 'antd'
import { useMemo, useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import Iframe from 'react-iframe'

function FileShowUzkadIcon({ item, label = '' }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showFile = () => {
    setIsModalOpen(true)
  }

  const contentUrl = useMemo(() => {
    const content = `${import.meta.env.VITE_BACKEND_URI}/api/v1/uzkad/file?filePath=${item.url}&ext=${
      item.extension
    }&contentDisposition=inline`

    return content
  }, [item])

  if (item?.extension && item.extension?.toLowerCase() === 'pdf') {
    return (
      <>
        <IconButton
          onClick={showFile}
          style={{ border: '1px solid #d9d9d9', color: '#555', fontSize: '14px', marginLeft: 4, fontWeight: 500 }}
        >
          <FaEye />
        </IconButton>

        <Modal
          style={{ top: 20 }}
          title={label}
          width={1200}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
          open={isModalOpen}
        >
          <div className="h-[800px]">
            <Iframe url={contentUrl} width="100%" height="100%" />
          </div>
        </Modal>
      </>
    )
  }

  return <> </>
}

export default FileShowUzkadIcon
