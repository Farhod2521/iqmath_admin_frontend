import { MapContainer } from 'react-leaflet'
import { Layer } from 'leaflet'
import { GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-boundary-canvas'

import _ from 'lodash'

import LayersControls from '@/components/map/LayersControls'
import { useMemo } from 'react'

export const MAP_STYLES = {
  STOCK: 1,
  SATELLITE: 2
}

function MapGeoJson({ location }: any) {
  const position = { lat: 41.32373, lng: 63.9528098 }

  const onEachFeature = (data: any, layer: Layer) => {
    const l = data.properties.label
    layer.bindPopup(l)
  }

  const data = useMemo(() => {
    if (!location) return null
    return {
      type: 'Feature',
      properties: {
        label: 'Quydagi yer'
      },
      geometry: location,
      center: {
        lng: location.coordinates[0][0][0],
        lat: location.coordinates[0][0][1]
      }
    }
  }, [location])
  return (
    <MapContainer
      center={data && data.center ? data.center : position}
      zoom={data ? 24 : 6}
      minZoom={6}
      maxZoom={18}
      scrollWheelZoom={true}
      attributionControl={false}
      style={{ minHeight: '450px', width: '100%', borderRadius: 8 }}
    >
      <LayersControls position="topright" />
      {data && <GeoJSON data={data as any} onEachFeature={onEachFeature} />}
    </MapContainer>
  )
}

export default MapGeoJson
