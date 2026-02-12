// MapContainer.tsx
import React, { useRef, useEffect, useState } from 'react'
import 'ol/ol.css'
import OlMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import { defaults as defaultInteractions } from 'ol/interaction'
import { Button, Card } from 'antd'

const DEFAULT_CENTER: [number, number] = [69.2401, 41.2995]

type Props = {
  children?: React.ReactNode
  center?: [number, number] | null
  zoom?: number
  minZoom?: number
  maxZoom?: number
  mapRefProp?: React.MutableRefObject<OlMap | null>
  height?: string
}

const MapContainer: React.FC<Props> = ({
  children,
  // center = [69.2401, 41.2995],
  center = null,
  zoom = 14,
  minZoom = 1,
  maxZoom = 24,
  mapRefProp,
  height = '500px'
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<OlMap | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const view = new View({
      center: fromLonLat(center ?? DEFAULT_CENTER),
      zoom,
      minZoom,
      maxZoom
    })

    const layers = [
      new TileLayer({
        source: new XYZ({ url: 'https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' })
      })
    ]

    const initialMap = new OlMap({
      target: mapRef.current,
      layers,
      view,
      interactions: defaultInteractions()
    })

    setMap(initialMap)
    if (mapRefProp) mapRefProp.current = initialMap
    return () => {
      initialMap.setTarget(undefined)
    }
  }, [])

  useEffect(() => {
    if (!map) return

    map.updateSize()

    if (!center) return

    map.getView().animate({
      center: fromLonLat(center),
      duration: 500
    })
  }, [center, map])

  useEffect(() => {
    if (map) {
      map.getView().setZoom(zoom)
    }
  }, [zoom])

  return (
    <div className="p-2 border bnorer-solid border-[#f0f0f0] rounded-xl">
      <div ref={mapRef} className={`w-full`} style={{ height }} />
      {map &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement<{ map: OlMap | null }>(child as React.ReactElement<{ map: OlMap | null }>, {
              map
            })
          }
          return child
        })}
    </div>
  )
}

export default MapContainer
