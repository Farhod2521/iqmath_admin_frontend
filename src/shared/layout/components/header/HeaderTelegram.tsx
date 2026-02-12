import React from 'react'
import { Button, Tooltip } from 'antd'
import { FaTelegramPlane } from 'react-icons/fa'

const TELEGRAM_URL = 'https://t.me/+XQSRSqM9yOM4MDky'

const HeaderTelegram: React.FC = () => {
  const openTelegram = () => {
    window.open(TELEGRAM_URL, '_blank')
  }

  return (
    <div className="flex items-center justify-end pt-1 pb-0 pl-1  border-l-2 border-gray-200">
      <Tooltip title="Telegram support" placement="top">
        <Button
          type="text"
          shape="circle"
          onClick={openTelegram}
          className="flex items-center justify-center transition-transform duration-200 hover:scale-110"
          icon={<FaTelegramPlane color="#2563eb" size={18} />}
        />
      </Tooltip>
    </div>
  )
}

export default HeaderTelegram
