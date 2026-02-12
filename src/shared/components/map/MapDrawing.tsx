// MapDrawing.tsx
import React, { useRef, useEffect } from 'react'
import OlMap from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Polygon } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Style, Fill, Stroke } from 'ol/style'
import { defaultStyle, hoverStyle, selectedStyle, modifiedStyle } from '../../libs/mapStyle'
import { GeoLoactionData } from '@/services'

type MapDrawingProps = {
  map?: OlMap | null
  geoJsonData: GeoLoactionData[]
  style?: Style
}

const MapDrawing: React.FC<MapDrawingProps> = ({ map, geoJsonData, style }) => {
  const layerRef = useRef<VectorLayer<VectorSource> | null>(null)

  const flyTo = (map: OlMap, location: [number, number], zoom: number) => {
    map.getView().animate({
      center: location,
      zoom,
      duration: 800
    })
  }

  useEffect(() => {
    if (!map || !geoJsonData || geoJsonData.length === 0) return

    if (layerRef.current) {
      try {
        map.removeLayer(layerRef.current)
      } catch {}
      layerRef.current = null
    }

    const features: Feature<Polygon>[] = geoJsonData.map((item) => {
      const coords: [number, number][] = JSON.parse(item.geometry.coordinates)
      const ring: [number, number][] = coords.map((c) => fromLonLat(c) as [number, number])

      const first = ring[0]
      const last = ring[ring.length - 1]
      if (first[0] !== last[0] || first[1] !== last[1]) ring.push(first)

      return new Feature({
        geometry: new Polygon([ring]),
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
      style: (feature) => {
        if (feature.get('redMark'))
          return new Style({
            fill: new Fill({ color: 'rgba(255,0,0,0.3)' }),
            stroke: new Stroke({ color: 'red', width: 3 })
          })
        if (feature.get('isDraft')) return hoverStyle
        if (feature.get('isParent')) return selectedStyle
        if (feature.get('origin')) return modifiedStyle
        return style || defaultStyle
      },
      zIndex: 10
    })

    map.addLayer(layer)
    layerRef.current = layer

    const originFeatures = features.filter((f) => f.get('origin'))
    if (originFeatures.length > 0) {
      const originSource = new VectorSource({ features: originFeatures })
      const extent = originSource.getExtent()
      if (extent) {
        const center: [number, number] = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
        map.once('rendercomplete', () => {
          flyTo(map, center, 20)
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
  }, [map, geoJsonData])

  return null
}

export default MapDrawing
