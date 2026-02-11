import { Form, Select } from 'antd'
import React from 'react'

function ShowSelect(props: any) {
  const { formik } = props
  const { label, isRequired, placeholder, options } = formik.values
  return (
    <Form.Item label={label} required={isRequired}>
      <Select options={options} placeholder={placeholder}></Select>
    </Form.Item>
  )
}

export default ShowSelect
