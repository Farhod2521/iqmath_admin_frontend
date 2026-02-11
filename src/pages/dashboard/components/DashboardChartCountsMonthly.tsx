import { Button, Card, Select } from 'antd'
import { useEffect, useState } from 'react'
import { EChartsOption } from 'echarts'
import ECharts from '../echarts/Echarts'
import { getDashboardCountsMonthly } from '@/http'

function DashboardStatusAndClause() {
  const [chartOption, setChartOption] = useState<LineChartType>(initialChart)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const getChartData = () => {
    setChartOption((prev: any) => ({ ...prev, loading: true }))
    getDashboardCountsMonthly({ year, month })
      .then((res) => {
        const properties = res.propertiesList
        const candidates = res.candidatesList

        const propertySeries: echarts.LineSeriesOption = {
          name: "O'zboshimcha egallangan yerlar",
          type: 'line',
          label: { show: true },
          data: properties
        }

        const candidateSeries: echarts.LineSeriesOption = {
          name: 'Nomzodlar',
          type: 'line',
          label: { show: true },
          data: candidates
        }

        const series = [propertySeries, candidateSeries]

        const barOptions = getChartOption(res.daysList, series)

        setChartOption((prev: any) => ({ ...prev, data: barOptions, error: false }))
      })
      .catch(() => setChartOption((prev: any) => ({ ...prev, error: true })))
      .finally(() => setChartOption((prev: any) => ({ ...prev, loading: false })))
  }

  useEffect(() => {
    getChartData()
  }, [year, month])

  return (
    <Card
      className="w-full max-w-1/2 dashboard__status"
      // title="Umummiy"
      extra={
        <Select
          placeholder="Yil"
          style={{ width: 120 }}
          value={year}
          allowClear
          onChange={(e) => setYear(e)}
          options={[
            { label: '2024', value: '2024' },
            { label: '2025', value: '2025' }
          ]}
        ></Select>
      }
    >
      <div className="flex gap-[2px] mb-4 justify-start items-center flex-wrap">
        {monthList.map((item, index) => (
          <Button key={index} onClick={() => setMonth(index + 1)} type={month === index + 1 ? 'default' : 'primary'}>
            {item}
          </Button>
        ))}
      </div>
      <ECharts style={{ height: 400 }} loading={chartOption.loading} options={chartOption.data} />
    </Card>
  )
}

export default DashboardStatusAndClause

function getChartOption(data: number[], series: any): EChartsOption {
  return {
    legend: { selectedMode: true },
    tooltip: { show: true },
    color: ['blue', 'red'],
    grid: { left: 50, right: 50, top: 50, bottom: 50 },
    yAxis: { type: 'value' },
    xAxis: { type: 'category', data },
    series
  }
}

const initialChart = { data: {}, error: false, loading: true }

type LineChartType = {
  loading: boolean
  error: boolean
  data: EChartsOption
}

const monthList = ['Yan', 'Fev', 'Mart', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
