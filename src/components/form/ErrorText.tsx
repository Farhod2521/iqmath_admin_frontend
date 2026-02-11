import { memo } from 'react'
import _ from 'lodash'

type ErrorTextType = {
  formik: any
  name: string
}

const ErrorText = ({ formik, name }: ErrorTextType) => {
  return (
    <div className="min-h-6 w-full text-red-500 font-md">
      {(_.get(formik?.errors, name) && _.get(formik?.errors, name)) ?? ' '}
    </div>
  )
}

export default memo(ErrorText)
