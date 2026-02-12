import { Style, Fill, Stroke } from 'ol/style'

export const defaultStyle = new Style({
  stroke: new Stroke({ color: '#3b82f6', width: 5 }),
  fill: new Fill({ color: 'rgba(59, 130, 246, 0.1)' })
})

export const hoverStyle = new Style({
  stroke: new Stroke({ color: '#f59e0b', width: 5 }),
  fill: new Fill({ color: 'rgba(245, 158, 11, 0.2)' })
})

export const selectedStyle = new Style({
  stroke: new Stroke({ color: '#10b981', width: 5 }),
  fill: new Fill({ color: 'rgba(16, 185, 129, 0.3)' })
})

export const modifiedStyle = new Style({
  stroke: new Stroke({ color: '#ef4444', width: 5 }),
  fill: new Fill({ color: 'rgba(239, 68, 68, 0.25)' })
})
