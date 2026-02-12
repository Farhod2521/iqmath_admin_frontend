import { Tag } from 'antd'
import { ConclusionType } from '../utils/constants'

export const renderConclusionStatus = (type: string) => {
  switch (type) {
    case ConclusionType.CONFIRM:
      return <Tag color="green">Ijobiy tasdiqlandi</Tag>
    case ConclusionType.DENY:
      return <Tag color="red">Salbiy tasdiqlandi</Tag>
    case ConclusionType.REJECT:
      return <Tag color="red">Rad etildi</Tag>
    case ConclusionType.FORWARD:
      return <Tag color="blue">Keyingi bosqichga o‘tkazildi</Tag>
    case ConclusionType.BACKWARD:
      return <Tag color="orange">Ortga qaytarildi</Tag>
    case ConclusionType.WAITING:
      return <Tag color="default">Kutilmoqda</Tag>
    default:
      return <Tag>—</Tag>
  }
}
