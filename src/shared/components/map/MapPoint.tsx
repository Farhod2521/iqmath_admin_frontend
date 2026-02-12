// MapPoint.tsx
import React, { useEffect, useRef } from 'react'
import OlMap from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import Overlay from 'ol/Overlay'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import { fromLonLat } from 'ol/proj'

type MapPointProps = {
  map?: OlMap | null
  geoJsonData: any[]
}

const MapPoint: React.FC<MapPointProps> = ({ map, geoJsonData }) => {
  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)
  const overlayRef = useRef<Overlay | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!map || !geoJsonData || geoJsonData.length === 0) return

    if (layerRef.current) {
      try {
        map.removeLayer(layerRef.current)
      } catch {}
      layerRef.current = null
    }

    // Tooltip yaratish
    if (!tooltipRef.current) {
      const div = document.createElement('div')
      div.className = 'map-tooltip'
      div.style.position = 'absolute'
      div.style.padding = '8px 12px'
      div.style.borderRadius = '10px'
      div.style.background = 'rgba(255, 255, 255, 0.8)'
      div.style.backdropFilter = 'blur(6px)'
      div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
      div.style.fontSize = '14px'
      div.style.fontWeight = '600'
      div.style.color = '#1f2937'
      div.style.pointerEvents = 'none'
      div.style.whiteSpace = 'nowrap'
      tooltipRef.current = div

      overlayRef.current = new Overlay({
        element: div,
        offset: [10, 0],
        positioning: 'bottom-left'
      })

      map.addOverlay(overlayRef.current)
    }

    const features: Feature<Point>[] = geoJsonData.map((item) => {
      const coords: [number, number][] = JSON.parse(item.geometry.coordinates)
      const ring: [number, number][] = coords.map((c) => fromLonLat(c) as [number, number])

      const xs = ring.map((c) => c[0])
      const ys = ring.map((c) => c[1])

      const center: [number, number] = [
        (Math.min(...xs) + Math.max(...xs)) / 2,
        (Math.min(...ys) + Math.max(...ys)) / 2
      ]

      return new Feature({
        geometry: new Point(center),
        propertyNumber: item.propertyNumber,
        statusId: item.statusId,
        isDraft: item.isDraft,
        isParent: item.isParent,
        origin: item.origin,
        redMark: item.redMark
      })
    })

    const source = new VectorSource({ features })

    const layer = new VectorLayer({
      source,
      style: (feature) =>
        new Style({
          image: new Circle({
            radius: 7,
            fill: new Fill({ color: feature.get('redMark') ? '#ef4444' : '#3b82f6' }),
            stroke: new Stroke({ color: '#fff', width: 2 })
          })
        }),
      zIndex: 20
    })

    map.addLayer(layer)
    layerRef.current = layer

    map.on('singleclick', (evt) => {
      const f = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature)

      if (f && tooltipRef.current && overlayRef.current) {
        const pos = (f.getGeometry() as Point).getCoordinates()
        overlayRef.current.setPosition(pos)
        tooltipRef.current.innerHTML = `<div style="font-size:15px; font-weight:700">${f.get('propertyNumber')}</div>`

        map.getTargetElement().style.cursor = 'pointer'
      } else {
        overlayRef.current?.setPosition(undefined)
        map.getTargetElement().style.cursor = 'grab'
      }
    })

    return () => {
      try {
        map.removeLayer(layer)
      } catch {}
      source.clear(true)
      layerRef.current = null
    }
  }, [map, geoJsonData])

  return null
}

export default MapPoint
