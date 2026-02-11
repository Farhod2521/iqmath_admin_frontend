import { Form, Input, Switch } from 'antd'
import { FormManagementType } from '../FormManagement'
import { ChangeEvent } from 'react'

function SwitchItem(props: FormManagementType) {
  const { data } = props

  return (
    <Form.Item label={data.label}>
      <Switch disabled={data?.disabled} checked={data.value === 'true'} />
    </Form.Item>
  )
}

export default SwitchItem
