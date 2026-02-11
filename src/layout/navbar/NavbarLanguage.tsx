import { useState, useEffect } from 'react'
import { Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

function NavbarLanguage() {
  const [locales, setLocales] = useState<Array<any>>(['uz_UZB'])

  const handleSelect = (key: string) => {
    if (locales[0] !== key) {
      setLocales([key])
      window.location.reload()
    }
  }

  const language = [
    { label: "O'zbekcha", key: 'uz_UZB' },
    { label: 'English', key: 'en_US' }
  ]

  const languageMenu: MenuProps['items'] = language.map((item) => ({
    ...item,
    label: <div onClick={() => handleSelect(item.key)}>{item.label}</div>
  }))

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocales([localStorage.getItem('locale')])
    }
  }, [])

  return (
    <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
      <div className="w-10 text-center cursor-pointer hover:bg-gray-100">
        <GlobalOutlined className="text-base" />
      </div>
    </Dropdown>
  )
}

export default NavbarLanguage
