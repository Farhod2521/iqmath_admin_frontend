import { Form, Input } from 'antd'
import { FormManagementType } from '../FormManagement'
import { ChangeEvent, useEffect } from 'react'

function InputTextarea(props: FormManagementType) {
  const { data } = props

  return (
    <Form.Item label={data.label}>
      <Input.TextArea disabled={data?.disabled} name={data.id} placeholder={data.placeholder} value={data.value} />
    </Form.Item>
  )
}

export default InputTextarea
