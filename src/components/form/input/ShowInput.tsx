import { Form, Input } from 'antd'

function ShowInput(props: any) {
  const { formik, type } = props
  const { label, isRequired, placeholder } = formik.values
  return (
    <Form.Item label={label} required={isRequired}>
      <Input placeholder={placeholder} type={type ? type : 'text'} />
    </Form.Item>
  )
}

export default ShowInput
