import { useRef, useState } from 'react'
import { Button } from 'antd'
import { toast } from 'react-toastify'
import { postFile } from '@/services'
import { FaUpload } from 'react-icons/fa'

type FilesUploadProps = {
  text?: string
  disabled?: boolean
  onFileUploaded?: (fileId: string) => void
}

export default function FIlesUpload({ text = 'Faylni yuklash', disabled = false, onFileUploaded }: FilesUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.zip')) {
      toast.error("Fayl faqat .zip formatida bo'lishi kerak")
      event.target.value = ''
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await postFile(formData, {})
      if (onFileUploaded) onFileUploaded(res.filename)
      toast.success('Fayl muvaffaqiyatli yuklandi')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
      event.target.value = ''
    }
  }

  const handleUploadClick = () => {
    if (disabled) {
      toast.error("Viloyat va Tuman tanlangan bo'lishi majburiy!!")
      return
    }
    inputRef.current?.click()
  }

  return (
    <>
      <input type="file" ref={inputRef} style={{ display: 'none' }} accept=".zip" onChange={handleFileChange} />
      <Button icon={<FaUpload />} onClick={handleUploadClick} loading={loading} disabled={disabled} type="primary">
        {text}
      </Button>
    </>
  )
}
