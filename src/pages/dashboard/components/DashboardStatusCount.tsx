import FAutoSelectWithPositions from '@/components/form/select/FAutoSelectWithPositions'
import { getStatucCountDownloadExcel, getStatusCount, StatusCountData } from '@/http'
import { downloadBase64 } from '@/utils/file'
import { Button, Card, Space, Table, TablePaginationConfig } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BsFiletypeXlsx } from 'react-icons/bs'
import { toast } from 'react-toastify'

const DashboardStatusCount = () => {
  const [data, setData] = useState<StatusCountData>()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
  const [loadingDownload, setLoadingDownload] = useState(false)
  const [filterData, setFilterData] = useState({
    regionSoato: undefined,
    districtSoato: undefined,
    neighborhoodId: undefined
  })
  const [loading, setLoading] = useState(false)

  const downloadExcel = () => {
    setLoadingDownload(true)
    getStatucCountDownloadExcel({ ...filterData })
      .then((res) => downloadBase64(res?.data?.file_content, res?.data?.file_name))
      .finally(() => setLoadingDownload(false))
  }

  const fetchData = useCallback(() => {
    setLoading(true)
    getStatusCount({ ...filterData })
      .then((res) => {
        setData(res)
      })
      .catch((err) => toast.error(err?.message))
      .finally(() => setLoading(false))
  }, [filterData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, ...p }))
  }

  const columns: ColumnsType<StatusCountData> = useMemo(() => {
    const baseCols = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10px',
        render: (rol: string, r: any, idx: number) => {
          const { current, pageSize } = pagination
          return <div>{(current - 1) * pageSize + idx + 1}</div>
        }
      },
      {
        title: 'Qonun modda',
        dataIndex: 'lawArticle',
        key: 'lawArticle',
        width: 200
      }
    ]

    const dynamicCols =
      data?.statusesList?.map((s) => ({
        title: s.name,
        dataIndex: s.code, // code orqali map qilamiz
        key: s.id
      })) || []

    return [...baseCols, ...dynamicCols, { title: 'Jami', dataIndex: 'totalCount', key: 'totalCount' }]
  }, [data])

  const tableData =
    data?.lawAccordanceCountsList?.map((item) => {
      const row: any = {
        id: item.id,
        lawArticle: item.lawArticle,
        totalCount: item.totalCount
      }

      item.statusCountsList.forEach((st) => {
        row[st.code] = st.count
      })

      return row
    }) || []

  return (
    <Card
      title="Holatlar soni"
      extra={
        <Space className="flex flex-wrap items-center gap-2 mb-2">
          <FAutoSelectWithPositions filterData={filterData} setFilterData={setFilterData} />
          <Button
            className="btn-success"
            type="primary"
            icon={<BsFiletypeXlsx />}
            onClick={downloadExcel}
            loading={loadingDownload}
          >
            Yuklash
          </Button>
        </Space>
      }
    >
      <Table
        loading={loading}
        bordered
        size="small"
        className="table__wrapper"
        pagination={false}
        dataSource={tableData}
        columns={columns}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
        summary={() => {
          const totals: any = {}
          tableData.forEach((row) => {
            Object.keys(row).forEach((key) => {
              if (typeof row[key] === 'number') {
                totals[key] = (totals[key] || 0) + row[key]
              }
            })
          })

          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>
                  <b>Jami</b>
                </Table.Summary.Cell>

                {data?.statusesList?.map((s, idx) => (
                  <Table.Summary.Cell index={idx + 2} key={s.code}>
                    <b>{totals[s.code] || 0}</b>
                  </Table.Summary.Cell>
                ))}

                <Table.Summary.Cell index={999}>
                  <b>{totals['totalCount'] || 0}</b>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )
        }}
      />
    </Card>
  )
}

export default DashboardStatusCount
