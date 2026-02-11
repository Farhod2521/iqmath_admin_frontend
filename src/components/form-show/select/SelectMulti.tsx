import { Form, Select } from 'antd'
import { FormManagementType } from '../FormManagement'
import { OptionType } from '@/http'
import { useEffect } from 'react'

function SelectMulti(props: FormManagementType) {
  const { data } = props

  return (
    <Form.Item label={data.label}>
      <Select mode="multiple" placeholder={data.placeholder} value={data.value} options={data.optionsList}></Select>
    </Form.Item>
  )
}

export default SelectMulti
