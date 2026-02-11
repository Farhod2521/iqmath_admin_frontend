import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import {
  byRole,
  DashboardPropertiesParamsType,
  EnumStates,
  getDashboardProperties,
  getExcelStatusCount,
  LawAccordanceType,
  StatisticsCountsListType
} from '@/http'
import { selectAreaData } from '@/store/dashboard/areaSlice'
import { Button, Card, Table } from 'antd'
import { useEffect, useState } from 'react'
import { BsFiletypeXlsx } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import type { TableColumnsType, TablePaginationConfig } from 'antd'
import { selectUserMe } from '@/store/auth/authSlice'
import { downloadBase64 } from '@/utils/file'
import FAutoSelect from '@/components/form/select/FAutoSelect'

function DashboardApplications() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const breadcrumb = useAppSelector(selectAreaData)
  const userData = useAppSelector(selectUserMe)

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })

  const userRole = { chooseDistrict: false, chooseRegion: false, ...userData?.position.role }

  const filterByValue =
    userRole.chooseRegion && userRole.chooseDistrict
      ? byRole.Neighborhood
      : userRole.chooseRegion
      ? byRole.District
      : byRole.Region
  const filterBySoato =
    userRole.chooseRegion && userRole.chooseDistrict
      ? userData?.position.district.soato
      : userRole.chooseRegion
      ? userData?.position.region.soato
      : 0
  const [filterData, setFilterData] = useState<DashboardPropertiesParamsType>({
    soato: Number(filterBySoato),
    by: filterByValue
  })

  const [loading, setLoading] = useState(false)
  const [loadingDownload, setLoadingDownload] = useState(false)
  const [data, setData] = useState<StatisticsCountsListType[]>()
  const [column, setColumn] = useState<TableColumnsType<StatisticsCountsListType>>([])
  const [dataFooter, setDataFooter] = useState([{ name: '', count: 0 }])
  const [btnObj, setBtnObj] = useState({ region: 0, district: 0, neightborhood: 0 })

  const footerTotal = (statusNamesList: string[], statisticsCountsList: StatisticsCountsListType[]) => {
    const dataList = statusNamesList.flatMap((item) => {
      const listCount = statisticsCountsList.reduce((a, b) => {
        const filtered = b.statusesStatisticsList.find((i) => i.name === item)
        if (filtered?.propertyCount) return a + filtered?.propertyCount
        else return a
      }, 0)

      const baseItem = { name: item, count: listCount }

      if (item === 'Muhokamada') {
        const countlist = statisticsCountsList.reduce((a, b) => {
          const filtered = b.statusesStatisticsList.find((i) => i.name === item)
          if (filtered?.indebtednessCount) return a + filtered?.indebtednessCount
          else return a
        }, 0)

        return [
          baseItem,
          { name: 'Qarzdorlik mavjud', count: countlist } // Keyingi indexga qo'shiladi
        ]
      }

      if (item === 'Rad etilgan') {
        const rejectMetrCount = statisticsCountsList.reduce((acc, b) => {
          const stat = b.statusesStatisticsList.find((s) => s.name === item)
          return acc + (stat?.rejectMetrCount || 0)
        }, 0)

        return [baseItem, { name: 'Taqiqlangan hududda joylashgan', count: rejectMetrCount }]
      }

      return [baseItem]
    })

    const nomzodCount = statisticsCountsList.reduce((a, b) => {
      return a + b.propertyTotalCount
    }, 0)
    setDataFooter([{ name: 'Nomzodlar', count: nomzodCount }, ...dataList])
  }

  const getData = () => {
    setLoading(true)
    getDashboardProperties({ ...filterData })
      .then((res) => {
        const buildColumn = (statusName: string, idx: number) => {
          if (statusName === 'Muhokamada') {
            return {
              title: 'Muhokamada',
              key: statusName,
              dataIndex: 'statusesStatisticsList',
              children: [
                {
                  title: 'Jarayonda',
                  dataIndex: 'statusesStatisticsList',
                  key: 'propertyCount',
                  render: (row: any) => row[idx]?.propertyCount
                },
                {
                  title: 'Qarzdorlik mavjud',
                  dataIndex: 'statusesStatisticsList',
                  key: 'indebtednessCount',
                  width: 150,
                  render: (row: any) => row[idx]?.indebtednessCount || 0
                }
              ]
            }
          }

          if (statusName === 'Rad etilgan') {
            return {
              title: 'Rad etilgan',
              key: statusName,
              dataIndex: 'statusesStatisticsList',
              children: [
                {
                  title: 'Rad etilgan',
                  dataIndex: 'statusesStatisticsList',
                  key: 'propertyCount',
                  width: 100,
                  render: (row: any) => row[idx]?.propertyCount
                },
                {
                  title: (
                    <div className="flex flex-col items-center">
                      <p>Taqiqlangan</p>
                      <p>hududda joylashgan</p>
                    </div>
                  ),
                  dataIndex: 'statusesStatisticsList',
                  key: 'rejectMetrCount',
                  width: 170,
                  render: (row: any) => row[idx]?.rejectMetrCount || 0
                }
              ]
            }
          }

          return {
            title: statusName,
            key: statusName,
            dataIndex: 'statusesStatisticsList',
            render: (row: any) => row[idx]?.propertyCount
          }
        }

        const columns = [
          { title: EnumStates[filterData.by], key: 'name', dataIndex: 'name', width: '15%' },
          { title: 'Nomzodlar', key: 'propertyTotalCount', dataIndex: 'propertyTotalCount' },
          ...res.statusNamesList.map((statusName, idx) => buildColumn(statusName, idx))
        ]
        setColumn(columns)
        // setColumn([
        //   { title: EnumStates[filterData.by], key: 'name', dataIndex: 'name', width: '15%' },
        //   { title: 'Nomzodlar', key: 'propertyTotalCount', dataIndex: 'propertyTotalCount' },
        //   ...res.statusNamesList.map((i, idx) => {
        //     if (i === 'Muhokamada') {
        //       return {
        //         title: 'Muhokamada',
        //         key: i,
        //         dataIndex: 'statusesStatisticsList',
        //         children: [
        //           {
        //             title: 'Jarayonda',
        //             dataIndex: 'statusesStatisticsList',
        //             key: 'propertyCount',
        //             width: 150,
        //             render: (j: any) => j[idx]?.propertyCount
        //           },
        //           {
        //             title: 'Qarzdorlik mavjud',
        //             dataIndex: 'statusesStatisticsList',
        //             key: 'indebtednessCount',
        //             width: 150,
        //             render: (j: any) => j[idx]?.indebtednessCount || 0
        //           }
        //         ]
        //       }
        //     } else if (i === 'Rad etilgan') {
        //       return {
        //         title: 'Rad etilgan',
        //         key: i,
        //         dataIndex: 'statusesStatisticsList',
        //         children: [
        //           {
        //             title: 'Rad etilgan',
        //             dataIndex: 'statusesStatisticsList',
        //             key: 'propertyCount',
        //             width: 150,
        //             render: (j: any) => j[idx]?.propertyCount
        //           },
        //           {
        //             title: 'Qarzdorlik mavjud',
        //             dataIndex: 'statusesStatisticsList',
        //             key: 'rejectMetrCount',
        //             width: 150,
        //             render: (j: any) => j[idx]?.rejectMetrCount || 0
        //           }
        //         ]
        //       }
        //     }
        //     return {
        //       title: i,
        //       key: i,
        //       dataIndex: 'statusesStatisticsList',
        //       render: (j: any) => j[idx].propertyCount
        //     }
        //   })
        // ])
        setData(res.statisticsCountsList)
        footerTotal(res.statusNamesList, res.statisticsCountsList)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [JSON.stringify(filterData)])

  const handleChange = (recod: StatisticsCountsListType) => {
    if (String(recod.soato).length === 4) setBtnObj((prev) => ({ ...prev, region: recod.soato }))
    if (String(recod.soato).length === 7) setBtnObj((prev) => ({ ...prev, district: recod.soato }))
    if (String(recod.soato).length === 10) {
      navigate('/applications/aplications_all')
      setBtnObj((prev) => ({ ...prev, neightborhood: recod.soato }))
    }

    if (String(recod.soato).length !== 10) {
      setFilterData((prev) => ({
        ...prev,
        soato: recod.soato,
        by: String(recod.soato).length === 4 ? byRole.District : byRole.Neighborhood
      }))
    }
  }

  const handleTableChange = (p: TablePaginationConfig) => {
    setPagination((prev) => ({ ...prev, ...p }))
  }

  const downloadExcel = () => {
    setLoadingDownload(true)
    getExcelStatusCount({ ...filterData })
      .then((res) => downloadBase64(res.data.file_content, res.data.file_name))
      .finally(() => setLoadingDownload(false))
  }

  // setFilterData((prev) => ({ ...prev, by: byRole.District, soato: Number(filterBySoato) }))

  return (
    <Card
      title="Umumiy"
      className="dashboard__application"
      extra={
        <div className="flex gap-4">
          <FAutoSelect
            placeholder="Moddalar"
            style={{ width: 140 }}
            formatOptions={(e) =>
              e.lawAccordancesList.map((i: LawAccordanceType) => ({ label: i.lawArticle, value: i.id }))
            }
            url={'/settings/law-accordance'}
            value={filterData.lawAccordanceId}
            onChange={(e: string) => setFilterData((prev) => ({ ...prev, lawAccordanceId: e }))}
          />

          <Button
            disabled={userRole.chooseRegion}
            onClick={() => setFilterData((prev) => ({ ...prev, by: byRole.Region, soato: 0 }))}
            type={filterData.by === 'region' ? 'primary' : 'default'}
          >
            Viloyatlar
          </Button>
          <Button
            disabled={!filterData.soato || userRole.chooseDistrict}
            onClick={() =>
              setFilterData((prev) => ({
                ...prev,
                by: byRole.District,
                soato: !btnObj.region ? Number(filterBySoato) : btnObj.region
              }))
            }
            type={filterData.by === 'district' ? 'primary' : 'default'}
          >
            Tumanlar
          </Button>
          <Button
            disabled={filterData.by !== 'neighborhood'}
            onClick={() => setFilterData((prev) => ({ ...prev, by: byRole.Neighborhood, soato: btnObj.district }))}
            type={filterData.by === 'neighborhood' ? 'primary' : 'default'}
          >
            Mahallalar
          </Button>
          <Button
            className="btn-success"
            type="primary"
            icon={<BsFiletypeXlsx />}
            onClick={downloadExcel}
            loading={loadingDownload}
          >
            Yuklash
          </Button>
        </div>
      }
    >
      <Table
        bordered
        size="small"
        className="table__wrapper "
        // scroll={{ x: '1400px', y: '480px' }}
        loading={loading}
        columns={[
          {
            title: 'T/r',
            key: 'id',
            dataIndex: 'id',
            width: '10px',
            render: (rol: string, r: StatisticsCountsListType, idx: number) => {
              const { current, pageSize } = pagination
              return <div>{(current - 1) * pageSize + idx + 1}</div>
            }
          },
          ...column
        ]}
        dataSource={data}
        rowKey={(r) => r.soato}
        onRow={(record: StatisticsCountsListType) => ({
          onDoubleClick: () => handleChange(record)
        })}
        pagination={false}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                <b>Jami</b>
              </Table.Summary.Cell>
              {dataFooter.map((item, index) => (
                <Table.Summary.Cell key={index} index={index}>
                  <b>{item.count}</b>
                </Table.Summary.Cell>
              ))}
            </Table.Summary.Row>
          </Table.Summary>
        )}
        onChange={handleTableChange}
        scroll={{ x: 1700 }}
      />
    </Card>
  )
}

export default DashboardApplications
