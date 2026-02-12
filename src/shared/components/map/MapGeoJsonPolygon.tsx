import React, { useRef, useEffect } from 'react'
import OlMap from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Polygon } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Style, Fill, Stroke } from 'ol/style'
import { defaultStyle, hoverStyle, selectedStyle, modifiedStyle } from '../../libs/mapStyle'
import { GeoLocationsShapeFileViewerData } from '@/services'

type MapDrawingProps = {
  map?: OlMap | null
  data: GeoLocationsShapeFileViewerData // bitta data
  style?: Style
  fitView?: boolean
  padding?: number
}

const MapGeoJsonPolygon: React.FC<MapDrawingProps> = ({ map, data, style, fitView = true, padding = 50 }) => {
  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)

  const flyTo = (map: OlMap, extent: number[], zoom?: number) => {
    const center: [number, number] = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
    map.getView().animate({
      center,
      zoom: zoom || map.getView().getZoom(),
      duration: 800
    })
  }

  useEffect(() => {
    if (!map || !data) return

    // Layerni oldin olib tashlash
    if (layerRef.current) {
      try {
        map.removeLayer(layerRef.current)
      } catch {}
      layerRef.current = null
    }

    // geometry string -> array
    const coords: [number, number][] =
      typeof data.geometry === 'string'
        ? JSON.parse(data.geometry).coordinates[0].map((c: number[]) => [c[0], c[1]])
        : data.geometry

    const ring = coords.map((c) => fromLonLat(c) as [number, number])

    // ensure polygon is closed
    const first = ring[0]
    const last = ring[ring.length - 1]
    if (first[0] !== last[0] || first[1] !== last[1]) ring.push(first)

    const feature = new Feature({
      geometry: new Polygon([ring])
    })

    const source = new VectorSource({ features: [feature] })

    const layer = new VectorLayer({
      source,
      style: (feature) => {
        if (feature.get('redMark'))
          return new Style({
            fill: new Fill({ color: 'rgba(255,0,0,0.3)' }),
            stroke: new Stroke({ color: 'red', width: 3 })
          })
        return style || defaultStyle
      },
      zIndex: 10
    })

    map.addLayer(layer)
    layerRef.current = layer

    if (fitView) {
      const extent = source.getExtent()
      if (extent) {
        map.getView().fit(extent, { padding: [padding, padding, padding, padding], duration: 500 })
        requestAnimationFrame(() => {
          flyTo(map, extent, 17)
        })
      }
    }

    return () => {
      try {
        map.removeLayer(layer)
      } catch {}
      source.clear(true)
      layerRef.current = null
    }
  }, [map, data, style, fitView, padding])

  return null
}

export default MapGeoJsonPolygon
