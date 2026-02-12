import React from 'react'
import { Tag } from 'antd'
import '@/assets/styles/components/index.scss'

interface StatusTagProps {
  name: string | undefined
  color: string | undefined
}

const StatusTag = ({ name, color }: StatusTagProps) => (
  <Tag
    className="status_tag"
    style={{
      backgroundColor: color + '20',
      color: color
    }}
  >
    {name}
  </Tag>
)

export default StatusTag
