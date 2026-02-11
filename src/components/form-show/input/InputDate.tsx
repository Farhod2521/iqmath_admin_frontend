import { Form, Input } from 'antd'
import { FormManagementType } from '../FormManagement'
import { ChangeEvent } from 'react'

function InputDate(props: FormManagementType) {
  const { data } = props

  return (
    <Form.Item label={data.label}>
      <Input disabled={data?.disabled} type="date" name={data.id} placeholder={data.placeholder} value={data.value} />
    </Form.Item>
  )
}

export default InputDate
