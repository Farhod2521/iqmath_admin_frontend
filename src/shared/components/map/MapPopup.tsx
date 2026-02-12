// MapPopup.tsx
import React, { useEffect, useRef } from 'react'
import Overlay from 'ol/Overlay'
import OlMap from 'ol/Map'

type Props = {
  map: OlMap
  coordinate: number[]
  children: React.ReactNode
}

const MapPopup: React.FC<Props> = ({ map, coordinate, children }) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<Overlay | null>(null)

  useEffect(() => {
    if (!popupRef.current) return

    const overlay = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      stopEvent: true
    })

    map.addOverlay(overlay)
    overlay.setPosition(coordinate)
    overlayRef.current = overlay

    return () => {
      map.removeOverlay(overlay)
    }
  }, [map, coordinate])

  return (
    <div
      ref={popupRef}
      style={{
        background: 'white',
        padding: 10,
        borderRadius: 8,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}
    >
      {children}
    </div>
  )
}

export default MapPopup
