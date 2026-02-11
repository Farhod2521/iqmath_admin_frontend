import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FileListDataType, FileListParamType, postFileList } from '@/http'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { toast } from 'react-toastify'

type FileUploadProps = {
  selectedFiles: FileListDataType[] | undefined
  setSelectedFiles: Function
  params: FileListParamType
  multiple: boolean
}

function FileUploadMultiple(props: FileUploadProps) {
  const { selectedFiles, setSelectedFiles, params, multiple } = props

  const [isLoading, setIsLoading] = useState(false)
  const [fileList, setFileList] = useState<File[]>([])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsLoading(true)
      const formData = new FormData()
      setFileList([])
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i])
        setFileList((prev) => [...prev, files[i]])
      }

      postFileList(formData, params)
        .then((res) => {
          setSelectedFiles(res)
          for (let i = 0; i < files.length; i++) {}
        })
        .catch((error) => {
          setSelectedFiles(null)
          setFileList([])
          toast.error(error?.response?.data?.message)
        })
        .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    selectedFiles && selectedFiles.length === 0 && setFileList([])
  }, [selectedFiles])

  return (
    <div className="flex gap-4 w-full">
      <Button disabled={isLoading} component="label" variant="outlined" tabIndex={-1} startIcon={<CloudUploadIcon />}>
        {selectedFiles && selectedFiles?.length > 0 ? '' : 'Fayl yuklash'}
        <VisuallyHiddenInput onChange={handleFileChange} type="file" multiple={multiple} />
      </Button>
      {fileList.length > 0 && (
        <div className={`w-full ${fileList.length > 1 ? '' : 'truncate'}`}>
          {fileList.map((i) => (
            <div className="p-1 truncate" key={i.name}>
              {i.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileUploadMultiple

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
