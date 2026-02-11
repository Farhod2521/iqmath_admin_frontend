import { Form, Input } from 'antd'

function ShowTextarea(props: any) {
  const { formik } = props
  const { label, isRequired, placeholder } = formik.values
  return (
    <Form.Item label={label} required={isRequired}>
      <Input.TextArea placeholder={placeholder} />
    </Form.Item>
  )
}

export default ShowTextarea
