import { memo } from 'react'
import { FieldFormDataType } from '@/http'
import FileSimple from './file/FileSimple'
import SelectMulti from './select/SelectMulti'
import SelectSimple from './select/SelectSimple'
import Switch from './switch/Switch'
import InputText from './input/InputText'
import InputTextarea from './input/InputTextarea'
import InputNumber from './input/InputNumber'
import InputDate from './input/InputDate'

export type FormManagementType = {
  data: FieldFormDataType
}

function FormManagement(props: FormManagementType) {
  const { data } = props
  const { fieldType } = data

  switch (fieldType) {
    case 'radio':
      return <SelectSimple data={data} />
    case 'checkbox':
      return <SelectMulti data={data} />
    case 'file':
      return <FileSimple data={data} />
    case 'boolean':
      return <Switch data={data} />
    case 'string':
      return <InputText data={data} />
    case 'textarea':
      return <InputTextarea data={data} />
    case 'number':
      return <InputNumber data={data} />
    case 'date':
      return <InputDate data={data} />
    default:
      return <InputText data={data} />
  }
}

export default memo(FormManagement)
