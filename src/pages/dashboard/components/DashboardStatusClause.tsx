import { Card } from 'antd'
import { useEffect, useState } from 'react'
import { EChartsOption } from 'echarts'
import ECharts from '../echarts/Echarts'
import { getStatusesCount, LawAccordanceType, StatusCountListType } from '@/http'
import FAutoSelect from '@/components/form/select/FAutoSelect'

function DashboardStatusClause() {
  const [barData, setBarData] = useState<ChartStackedBarType>(initialPie)
  const [filterData, setFilterData] = useState({
    lawAccordanceId: undefined
  })

  // const statusDataList = [
  //   { name: 'Yakunlangan', count: 201 },
  //   { name: "E'londa", count: 15438 },
  //   { name: "E'tirozlarni ko'rib chiqish", count: 0 },
  //   { name: 'Adliyada', count: 4344 },
  //   { name: 'Taxrirlash', count: 2877 },
  //   { name: 'Rad etilgan', count: 193 },
  //   { name: "To'lov kutilmoqda", count: 281 },
  //   { name: 'Qarorda', count: 160 },
  //   { name: 'Muhokamada', count: 121221000 }
  // ]

  const getBarChart = () => {
    setBarData((prev: any) => ({ ...prev, loading: true }))
    getStatusesCount({ ...filterData })
      .then((res) => {
        const statusCountList = res?.statusCountList?.slice()?.reverse() || []
        const dynamicStatusesList = statusCountList?.map((item: any) => item.name)

        const barSeries: echarts.BarSeriesOption[] = statusCountList.map((item: StatusCountListType, index: number) => {
          return {
            name: item.name,
            type: 'bar',
            stack: 'total',
            barWidth: '100%',
            label: {
              show: true,
              position: 'right',
              // position: 'insideRight',
              fontWeight: 'bold',
              fontSize: 12,
              formatter: (params: any) => {
                const index = params.dataIndex
                return params.seriesIndex === index ? params.value : ''
              }
            },
            data: statusCountList?.map((_, i) => (i === index ? item.count : 0))
          }
        })

        const series = [...barSeries]
        const barOptions = getStackedBarOptions(dynamicStatusesList, series)

        setBarData((prev) => ({ ...prev, data: barOptions, error: false }))
      })
      .catch(() => setBarData((prev) => ({ ...prev, error: true })))
      .finally(() => setBarData((prev) => ({ ...prev, loading: false })))
  }

  useEffect(() => {
    getBarChart()
  }, [JSON.stringify(filterData)])

  return (
    <Card
      className="w-full"
      extra={
        <FAutoSelect
          placeholder="Moddalar"
          style={{ width: 140 }}
          formatOptions={(e) =>
            e.lawAccordancesList.map((i: LawAccordanceType) => ({ label: i.lawArticle, value: i.id }))
          }
          url={'/settings/law-accordance'}
          value={filterData.lawAccordanceId || undefined}
          onChange={(e: any) => setFilterData((prev) => ({ ...prev, lawAccordanceId: e }))}
        />
      }
    >
      <ECharts style={{ height: 420 }} loading={barData.loading} options={barData.data} />
    </Card>
  )
}

export default DashboardStatusClause

function getStackedBarOptions(data: string[], series: any): EChartsOption {
  const maxValue = Math.max(...series.flatMap((s: any) => s.data))
  const dynamicMax = Math.ceil(maxValue * 1.1)

  return {
    tooltip: {
      show: true
    },
    color: ['#1ea8e7', '#34b1ea', '#4ab9ec', '#5fc2ee', '#75cbf0', '#8bd4f2', '#a1ddf5', '#b6e6f7', '#ccf0f9'],
    grid: { left: 110, right: 40, top: 10, bottom: 20 },
    xAxis: {
      type: 'value',
      max: dynamicMax,
      min: 0
    },
    yAxis: {
      type: 'category',
      data,
      axisLabel: {
        show: true,
        overflow: 'truncate',
        interval: 0,
        width: 110,
        fontWeight: 'normal'
      }
    },
    series
  }
}

const initialPie = { data: {}, error: false, loading: true }

type ChartStackedBarType = {
  loading: boolean
  error: boolean
  data: EChartsOption
}
