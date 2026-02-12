import React, { useEffect } from 'react'
import OlMap from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import { Style, Fill, Stroke } from 'ol/style'

interface Props {
  map?: OlMap | null
  geometry: string | null
  flyToDuration?: number // ms
  flyToZoom?: number
}

const MapDrawingConfirm: React.FC<Props> = ({ map, geometry, flyToDuration = 800, flyToZoom = 14 }) => {
  const flyTo = (map: OlMap, location: [number, number], zoom: number) => {
    map.getView().animate({
      center: location,
      zoom,
      duration: 800
    })
  }

  useEffect(() => {
    if (!map || !geometry) return

    let geometryObj
    try {
      geometryObj = JSON.parse(geometry)
    } catch (err) {
      console.error('Invalid geometry JSON', err)
      return
    }

    map
      .getLayers()
      .getArray()
      .forEach((layer) => {
        if (layer instanceof VectorLayer && layer.get('type') === 'drawing-layer') {
          map.removeLayer(layer)
        }
      })

    const coords = geometryObj.coordinates[0]
    const feature = new Feature({ geometry: new Polygon([coords]) })
    const vectorSource = new VectorSource({ features: [feature] })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({ color: 'blue', width: 3 }),
        fill: new Fill({ color: 'rgba(0,0,255,0.2)' })
      })
    })

    vectorLayer.set('type', 'drawing-layer')
    map.addLayer(vectorLayer)

    // Polygon markazini hisoblash
    const extent = vectorSource.getExtent()
    if (extent) {
      const center: [number, number] = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
      requestAnimationFrame(() => {
        flyTo(map, center, 14)
      })
    }
  }, [map, geometry])

  return null
}

export default MapDrawingConfirm
