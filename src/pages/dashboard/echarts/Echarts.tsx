/* Created by Dhaval Laiya */

import React, { memo, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

interface EChartsProps {
  options: echarts.EChartsOption
  style?: React.CSSProperties
  className?: string
  loading?: boolean
  message?: React.ReactNode
}

const ECharts: React.FC<EChartsProps> = React.memo(({ options, style, className, loading, message }) => {
  const [chart, setChart] = useState<echarts.ECharts | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current, 'westeros')
      chartInstance.setOption({ ...options, resizeObserver }, { notMerge: true })
      setChart(chartInstance)
      if (resizeObserver) resizeObserver.observe(chartRef.current)
      return () => {
        // if (resizeObserver) resizeObserver.unobserve(chartRef.current!)
        chartInstance.dispose()
      }
    }
  }, [options])

  useEffect(() => {
    if (!chart) return
    if (loading) {
      chart.showLoading()
    } else {
      chart.hideLoading()
    }
  }, [chart, loading])

  useEffect(() => {
    if (chart && message) {
      chart.clear()
    }
  }, [chart, message])

  const combinedStyle: React.CSSProperties = {
    height: 350,
    ...style
  }

  return (
    <div className="echarts-parent position-relative">
      <div ref={chartRef} style={combinedStyle} className={`echarts-react ${className}`} />
      {message && <div className="no-data">{message}</div>}
    </div>
  )
})

export default memo(ECharts)

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => {
    const instance = echarts.getInstanceByDom(target as HTMLElement)
    if (instance) {
      instance.resize()
    }
  })
})
