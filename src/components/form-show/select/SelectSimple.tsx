import { Form, Select } from 'antd'
import { FormManagementType } from '../FormManagement'
import { useEffect } from 'react'

function SelectSimple(props: FormManagementType) {
  const { data } = props

  return (
    <Form.Item label={data.label}>
      <Select
        disabled={data?.disabled}
        placeholder={data.placeholder}
        value={data.value}
        options={data.optionsList}
      ></Select>
    </Form.Item>
  )
}

export default SelectSimple
