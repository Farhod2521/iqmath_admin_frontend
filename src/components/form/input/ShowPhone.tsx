import { Form, Input } from 'antd'
import { useState } from 'react'

function ShowPhone(props: any) {
  const { formik } = props
  const { label, isRequired, placeholder } = formik.values

  const [phoneNumber, setPhoneNumber] = useState<string>('+998')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value
    input = input.replace(/[^0-9+]/g, '')
    const match = input.match(/^(\+998)?(\d{0,2})?(\d{0,3})?(\d{0,2})?(\d{0,2})$/)
    if (match) {
      input = match
        .slice(1)
        .filter(Boolean)
        .join(' ')
        .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+998 $1 $2 $3 $4')
      setPhoneNumber(input)
    }
  }

  return (
    <Form.Item label={label} required={isRequired}>
      <Input value={phoneNumber} onChange={handleInputChange} placeholder={placeholder} type="text" />
    </Form.Item>
  )
}

export default ShowPhone
