import { useEffect, useState } from 'react'
import OlMap from 'ol/Map'
import { toLonLat } from 'ol/proj'
import { getGeoLocationsOpenMaps2 } from '@/services'

type Props = {
  map?: OlMap | null
  setData: any
}

const MapBboxDataFetcher: React.FC<Props> = ({ map, setData }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!map) return

    const fetchDataForCurrentView = async () => {
      try {
        setLoading(true)

        // Hozirgi view extent ni olish
        const view = map.getView()
        const extent = view.calculateExtent(map.getSize())
        const zoom = view.getZoom()
        if (zoom && zoom < 14) return
        // Extent ni lon/lat ga o'tkazish (EPSG:3857 dan EPSG:4326 ga)
        const bottomLeft = toLonLat([extent[0], extent[1]])
        const topRight = toLonLat([extent[2], extent[3]])

        const [minLng, minLat] = bottomLeft
        const [maxLng, maxLat] = topRight

        // API ga so'rov yuborish
        const params = {
          minLng: minLng.toFixed(4),
          minLat: minLat.toFixed(4),
          maxLng: maxLng.toFixed(4),
          maxLat: maxLat.toFixed(4)
        }

        const response = await getGeoLocationsOpenMaps2(params)
        setData({
          type: 'FeatureCollection'
          // features: response.map((i) => ({
          //   type: 'Feature',
          //   properties: { id: i.id, name: i.name },
          //   geometry: i.coordinates
          // }))
        })
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }

    // Xarita yuklanganida bir marta chaqirish
    fetchDataForCurrentView()

    // Xarita harakatlanganda chaqirish (debounce bilan)
    let timeoutId: NodeJS.Timeout

    const handleMoveEnd = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fetchDataForCurrentView()
      }, 500) // 500ms kechikish
    }

    map.on('moveend', handleMoveEnd)

    return () => {
      map.un('moveend', handleMoveEnd)
      clearTimeout(timeoutId)
    }
  }, [map])

  // Loading indikatori (ixtiyoriy)
  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'white',
          padding: '8px 16px',
          borderRadius: 4,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        Yuklanmoqda...
      </div>
    )
  }

  return null
}

export default MapBboxDataFetcher
