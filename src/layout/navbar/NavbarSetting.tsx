import { LuSettings } from 'react-icons/lu'
import { Tooltip } from 'antd'
type Props = {
  onSetting: () => void
}

function NavbarSetting({ onSetting }: Props) {
  return (
    <Tooltip title="sozlamalar" placement="top">
      <div className="cursor-pointer ml-2 transition-transform duration-200 hover:scale-110" onClick={onSetting}>
        <LuSettings size={18} style={{ color: '#555' }} />
      </div>
    </Tooltip>
  )
}

export default NavbarSetting
