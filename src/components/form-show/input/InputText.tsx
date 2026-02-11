import { Form, Input } from 'antd'
import { FormManagementType } from '../FormManagement'

function InputText(props: FormManagementType) {
  const { data } = props

  return (
    <Form.Item label={data.label}>
      <Input disabled={data?.disabled} type="text" name={data.id} placeholder={data.placeholder} value={data.value} />
    </Form.Item>
  )
}

export default InputText
