import { ChangeEvent, useState } from 'react'
import { Button } from '@mui/material'
import { FileParamType, postFile } from '@/http'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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

type FileUploadProps = {
  selectedFile: File
  setSelectedFile: Function
  params: FileParamType
}

export default function FileUpload(props: FileUploadProps) {
  const { selectedFile, setSelectedFile, params } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
      setIsLoading(true)

      const formData = new FormData()
      formData.append('file', event.target.files[0])

      postFile(formData, params)
        .then((res: any) => {})
        .catch(() => {
          setSelectedFile(null)
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <Button disabled={isLoading} component="label" variant="outlined" tabIndex={-1} startIcon={<CloudUploadIcon />}>
      {selectedFile ? selectedFile.name : 'Fayl yuklash'}
      <VisuallyHiddenInput onChange={handleFileChange} type="file" />
    </Button>
  )
}
