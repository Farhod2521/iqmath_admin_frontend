import { Card } from 'antd'
import { useEffect, useState } from 'react'
import { EChartsOption } from 'echarts'
import ECharts from '../echarts/Echarts'
import { getStatusAndClause } from '@/http'

function DashboardStatusAndClause() {
  const [barData, setBarData] = useState<ChartStackedBarType>(initialPie)

  const getBarChart = () => {
    setBarData((prev: any) => ({ ...prev, loading: true }))
    getStatusAndClause()
      .then((res) => {
        // const rawData = [
        //   [100, 302, 301, 334, 390, 330, 320, 320],
        //   [320, 132, 101, 134, 90, 230, 210, 320],
        //   [220, 182, 191, 234, 290, 330, 310, 320],
        //   [150, 212, 201, 154, 190, 330, 210, 320],
        //   [82, 83, 90, 93, 129, 133, 132, 120],
        //   [82, 83, 90, 93, 129, 133, 132, 120],
        //   [82, 83, 90, 93, 129, 133, 132, 120],
        //   [190, 83, 90, 93, 129, 120, 130, 120]
        // ]
        const rawData = res.countList

        const barSeries: echarts.BarSeriesOption[] = res.statusesList.map((name, sid) => {
          return {
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '70%',
            label: {
              show: true,
              formatter: (params: any) => params.value
            },
            data: rawData[sid]
          }
        })

        const lineSeries: echarts.LineSeriesOption = {
          name: 'Barchasi',
          type: 'line',
          label: {
            show: true
          },
          data: matrixTotal(rawData)
        }

        const series = [lineSeries, ...barSeries]

        const barOptions = getStackedBarOptions(res.lawAccordancesList, series)

        setBarData((prev) => ({ ...prev, data: barOptions, error: false }))
      })
      .catch(() => setBarData((prev) => ({ ...prev, error: true })))
      .finally(() => setBarData((prev) => ({ ...prev, loading: false })))
  }

  useEffect(() => {
    getBarChart()
  }, [])

  return (
    <Card className="w-full">
      <ECharts style={{ height: 520 }} loading={barData.loading} options={barData.data} />
    </Card>
  )
}

export default DashboardStatusAndClause

function getStackedBarOptions(data: string[], series: any): EChartsOption {
  return {
    legend: {
      selectedMode: true
    },
    tooltip: {
      show: true
    },
    color: ['#E6F4FF', '#4094F7', '#58A2F8', '#70B0F9', '#88BEFA', '#A0CCFB', '#B8DAFC', '#D0E8FD', '#E6F4FF'],
    grid: { left: 50, right: 0, top: 100, bottom: 40 },
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data
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

const matrixTotal = (data: number[][]): number[] => {
  const totalData: number[] = []
  for (let i = 0; i < data[0].length; ++i) {
    let sum = 0
    for (let j = 0; j < data.length; ++j) {
      sum += data[j][i]
    }
    totalData.push(sum)
  }

  return totalData
}
