import { Form, Select, Switch } from 'antd'
import React from 'react'

function ShowSwitch(props: any) {
  const { formik } = props
  const { label, isRequired } = formik.values
  return (
    <Form.Item label={label} required={isRequired}>
      <Switch />
    </Form.Item>
  )
}

export default ShowSwitch
