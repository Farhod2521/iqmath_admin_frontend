import React from 'react'
import { Button, Space, Tag } from 'antd'
import { FaEdit, FaSignOutAlt } from 'react-icons/fa'
import { formatDateColumn, formatValue } from '@/shared/components/tables/formatters'
import { UserData } from '@/services'
import { ColumnsType } from 'antd/es/table'

type Props = {
  handleCopy: (login: string) => void
  userRole?: string
  pagination?: { current: number; pageSize: number; total: number }
  handleRowClick: (record: UserData) => void
  handleAuthImpersonate: (record: UserData) => void
}

export const UserPermisesColumns = ({
  handleCopy,
  userRole,
  pagination,
  handleRowClick,
  handleAuthImpersonate
}: Props): ColumnsType<UserData> => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '10px',
    render: (_: string, __: UserData, idx: number) => {
      if (!pagination) return idx + 1
      const { current, pageSize } = pagination
      return <div>{(current - 1) * pageSize + idx + 1}</div>
    }
  },
  {
    title: 'Ism',
    dataIndex: 'fullName',
    key: 'fullName',
    render: formatValue
  },
  {
    title: 'One ID login',
    dataIndex: 'oneIdLogin',
    key: 'oneIdLogin',
    render: (oneIdLogin: string) =>
      oneIdLogin ? (
        <Tag className="cursor-pointer" color="processing" onClick={() => handleCopy(oneIdLogin)}>
          {oneIdLogin}
        </Tag>
      ) : (
        '---'
      )
  },
  {
    title: 'Tashkilot',
    dataIndex: 'organisation',
    key: 'organisation',
    render: (org: any) => formatValue(org?.name)
  },
  {
    title: 'Viloyat',
    dataIndex: 'region',
    key: 'region',
    render: (region: any) => formatValue(region?.name)
  },
  {
    title: 'Tuman',
    dataIndex: 'district',
    key: 'district',
    render: (district: any) => formatValue(district?.name)
  },
  {
    title: 'Rol',
    dataIndex: 'role',
    key: 'role',
    render: (role: any) => formatValue(role?.name)
  },
  {
    title: 'Holati',
    dataIndex: 'status',
    key: 'status',
    render: (status: boolean) => <Tag color={status ? 'blue' : 'red'}>{status ? 'Aktiv' : 'Aktiv emas'}</Tag>
  },
  {
    title: 'Yaratilgan vaqti',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: formatDateColumn
  },
  {
    title: 'Oxirgi kirgan vaqti',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
    render: formatDateColumn
  },
  ...(userRole === 'superadmin'
    ? [
        {
          title: 'Foydalanish',
          dataIndex: 'id',
          key: 'action',
          width: 100,
          render: (id: string, user: UserData) => (
            <Space>
              <Button variant="outlined" size="small" onClick={() => handleAuthImpersonate(user)}>
                <FaSignOutAlt color="blue" />
              </Button>
              <Button variant="outlined" size="small" onClick={() => handleRowClick(user)}>
                <FaEdit color="blue" />
              </Button>
            </Space>
          )
        }
      ]
    : [])
]
