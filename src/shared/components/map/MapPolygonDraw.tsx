// MapPolygonDraw.tsx
import React, { useEffect, useRef, useState } from 'react'
import OlMap from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Draw, Interaction, Modify, Snap } from 'ol/interaction'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import { Style, Fill, Stroke } from 'ol/style'
import { Geometry } from 'ol/geom'
import { Button, Tooltip } from 'antd'

type Props = {
  map?: OlMap | null
  onPolygonChange?: (polygonGeoJson: string, areaGa: number) => void
  resetKey?: number
}

const MapPolygonDraw: React.FC<Props> = ({ map, onPolygonChange, resetKey }) => {
  const vectorRef = useRef<VectorLayer<VectorSource<Feature<Geometry>>> | null>(null)
  const drawRef = useRef<Draw | null>(null)
  const modifyRef = useRef<Modify | null>(null)
  const snapRef = useRef<Snap | null>(null)
  const [drawing, setDrawing] = useState(false)

  // Clear polygon
  const clearPolygon = () => {
    if (vectorRef.current) {
      vectorRef.current.getSource()?.clear()
      onPolygonChange?.('', 0)
      setDrawing(false)
      removeDrawInteraction()
    }
  }

  const removeDrawInteraction = () => {
    if (map && drawRef.current) {
      map.removeInteraction(drawRef.current)
    }
  }

  const addDrawInteraction = () => {
    if (map && drawRef.current) {
      map.addInteraction(drawRef.current)
    }
  }

  useEffect(() => {
    if (!map) return

    // 1) Vector source + layer
    const vectorSource = new VectorSource()
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({ color: 'red', width: 2 }),
        fill: new Fill({ color: 'rgba(255,0,0,0.3)' })
      })
    })
    map.addLayer(vectorLayer)
    vectorRef.current = vectorLayer

    // 2) Draw interaction
    const draw = new Draw({ source: vectorSource, type: 'Polygon' })
    drawRef.current = draw

    // 3) Modify interaction
    const modify = new Modify({ source: vectorSource })
    modifyRef.current = modify
    map.addInteraction(modify)

    // 4) Snap interaction
    const snap = new Snap({ source: vectorSource })
    snapRef.current = snap
    map.addInteraction(snap)

    // Update polygon handler
    const updatePolygon = () => {
      const features = vectorSource.getFeatures()
      if (!features.length) {
        onPolygonChange?.('', 0)
        return
      }
      const geom = features[0].getGeometry() as Polygon
      const coords = geom.getCoordinates()[0]

      const geoJson = { type: 'Polygon', coordinates: [coords] }
      const areaGa = +(geom.getArea() / 10000).toFixed(3)
      onPolygonChange?.(JSON.stringify(geoJson), areaGa)

      const extent = geom.getExtent()
      const center: [number, number] = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
      map.getView().animate({
        center,
        duration: 500
      })
    }

    draw.on('drawstart', () => {
      vectorSource.clear()
    })

    draw.on('drawend', (e) => {
      setDrawing(false)
      removeDrawInteraction()
      map.getInteractions().forEach((i: Interaction) => {
        if (i.constructor.name === 'DragPan') i.setActive(true)
      })

      setTimeout(() => updatePolygon(), 50)
    })

    modify.on('modifyend', updatePolygon)

    return () => {
      map.removeLayer(vectorLayer)
      map.removeInteraction(draw)
      map.removeInteraction(modify)
      map.removeInteraction(snap)
      vectorSource.clear()
    }
  }, [map])

  // Reset polygon when resetKey changes
  useEffect(() => {
    clearPolygon()
  }, [resetKey])

  // Toggle drawing interaction
  useEffect(() => {
    if (!map || !drawRef.current) return
    if (drawing) addDrawInteraction()
    else removeDrawInteraction()
  }, [drawing, map])

  return (
    <div className="absolute bg-white top-20 right-12 z-20 flex gap-2 p-2 flex-col rounded-xl">
      <Tooltip title="Koordinata chizish">
        <Button type="text" onClick={() => setDrawing(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <path
                d="M16 4.16521V1.07593H12.9107V2.1518H3.08928V1.07593H0V4.16521H1.07591V11.8349H0V14.9241H3.08928V13.8483H12.9107V14.9241H16V11.8349H14.9241V4.16521H16ZM13.8482 2.01343H15.0625V3.22771H13.8482V2.01343ZM0.9375 2.01343H2.15178V3.22771H0.9375V2.01343ZM2.15178 13.9866H0.9375V12.7723H2.15178V13.9866ZM15.0625 13.9866H13.8482V12.7723H15.0625V13.9866ZM13.9866 11.8348H12.9107V12.9107H3.08928V11.8348H2.01341V4.16521H3.08928V3.0893H12.9107V4.16521H13.9866V11.8348Z"
                fill="#323232"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="16" height="16" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="Tanlangan koordinatani o'chirish">
        <Button type="text" onClick={clearPolygon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.3332 7.5V15.8333H6.6665V7.5H13.3332ZM12.0832 2.5H7.9165L7.08317 3.33333H4.1665V5H15.8332V3.33333H12.9165L12.0832 2.5ZM14.9998 5.83333H4.99984V15.8333C4.99984 16.75 5.74984 17.5 6.6665 17.5H13.3332C14.2498 17.5 14.9998 16.75 14.9998 15.8333V5.83333Z"
              fill="#323232"
            ></path>
          </svg>
        </Button>
      </Tooltip>
    </div>
  )
}

export default MapPolygonDraw
