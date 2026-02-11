import { Form, Input } from 'antd'
import { FormManagementType } from '../FormManagement'
import { ChangeEvent, useEffect } from 'react'

function InputNumber(props: FormManagementType) {
  const { data } = props

  return (
    <Form.Item label={data.label}>
      <Input disabled={data?.disabled} type="number" name={data.id} placeholder={data.placeholder} value={data.value} />
    </Form.Item>
  )
}

export default InputNumber
