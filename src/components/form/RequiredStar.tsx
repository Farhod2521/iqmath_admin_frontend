import React, { memo } from 'react'
import PropsTypes from 'prop-types'

const RequiredStar = ({ isVisible = true }) => (isVisible ? <span className="text-red-500 p-1">*</span> : null)

export default memo(RequiredStar)

RequiredStar.propTypes = {
  isVisible: PropsTypes.bool
}
