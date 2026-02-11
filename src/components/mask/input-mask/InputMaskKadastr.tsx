import { Input } from 'antd'
import { useState } from 'react'

type KadastrMaskedInputProps = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  maxLength?: number
}

const formatKadastr = (value: string): string => {
  // const digits = value.replace(/\D/g, '')
  const digits = value.trim().replace(/\s/g, '').replace(/\D/g, '')

  if (!digits) return ''

  const masks = [
    [2, 2], // 99:99
    [2, 2, 2], // 99:99:99
    [2, 2, 2, 2], // 99:99:99:99
    [2, 2, 2, 2, 2], // 99:99:99:99:99
    [2, 2, 2, 2, 2, 4], // 99:99:99:99:99:9999
    [2, 2, 2, 2, 2, 4, 2], // 99:99:99:99:99:9999/99
    [2, 2, 2, 2, 2, 4, 4], // 99:99:99:99:99:9999:9999
    [2, 2, 2, 2, 2, 4, 4, 3], // 99:99:99:99:99:9999:9999:999
    [2, 2, 2, 2, 2, 4, 4, 3, 2] // 99:99:99:99:99:9999:9999:999/99
  ]

  let formatted = digits

  for (let mask of masks) {
    let result = ''
    let index = 0
    let isValid = true

    for (let i = 0; i < mask.length; i++) {
      const part = digits.slice(index, index + mask[i])
      if (!part) {
        isValid = false
        break
      }

      result += part
      index += mask[i]

      if (part.length === mask[i] && i < mask.length - 1) {
        if (i === 5 && mask.length > 6 && digits.length <= 16) result += '/'
        else if (i === 6 && mask.length > 7) result += ':'
        else if (i === 7 && mask.length > 8 && digits.length > 16) result += '/'
        else result += ':'
      }
    }

    if (isValid) {
      formatted = result
    }
  }

  return formatted
}

const InputMaskKadastr = ({
  value = '',
  onChange,
  placeholder = 'Qidirish kadastr raqami',
  className = 'sm:w-[200px] w-full',
  maxLength = 31
}: KadastrMaskedInputProps) => {
  const [localValue, setLocalValue] = useState(value)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const masked = formatKadastr(inputValue)
    setLocalValue(masked)
    if (onChange) {
      onChange(masked)
    }
  }

  return (
    <Input
      allowClear
      name="search"
      value={localValue}
      className={className}
      placeholder={placeholder}
      onChange={handleSearchChange}
      maxLength={maxLength}
    />
  )
}

export default InputMaskKadastr
