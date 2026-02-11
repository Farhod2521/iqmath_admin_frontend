import { memo } from 'react'
import ShowSelect from './select/ShowSelect'
import ShowSwitch from './switch/ShowSwitch'
import ShowInput from './input/ShowInput'
import ShowTextarea from './input/ShowTextarea'
import ShowPhone from './input/ShowPhone'
import ShowCadastral from './input/ShowCadastral'

function FormManagement(props: any) {
  const { type } = props
  switch (type) {
    case 'radio':
      return <ShowSelect {...props} />
    case 'checkbox':
      return <ShowSelect mode="tags" {...props} />
    case 'boolean':
      return <ShowSwitch {...props} />
    case 'string':
      return <ShowInput {...props} />
    case 'textarea':
      return <ShowTextarea {...props} />
    case 'number':
      return <ShowInput type="number" {...props} />
    case 'date':
      return <ShowInput type="date" {...props} />
    case 'phone':
      return <ShowPhone {...props} />
    case 'cadastral':
      return <ShowCadastral {...props} />

    default:
      return <ShowInput {...props} />
  }
}

export default memo(FormManagement)
