import { Form, Input } from 'antd'
import { useState } from 'react'

function ShowCadastral(props: any) {
  const { formik } = props
  const { label, isRequired, placeholder } = formik.values

  return (
    <Form.Item label={label} required={isRequired}>
      <Input placeholder={placeholder} type="text" />
    </Form.Item>
  )
}

export default ShowCadastral
