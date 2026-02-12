// MapBoundaryLayer.tsx
import React, { useEffect } from 'react'
import OlMap from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import { Style, Fill, Stroke } from 'ol/style'
import { GeoJSON as OLGeoJSON } from 'ol/format'
import MultiPolygon from 'ol/geom/MultiPolygon'

import uzmap from './uzmap.json'

type Props = {
  map?: OlMap | null
  maskColor?: string // rgba color, default semi-opaque black
  fitToView?: boolean
  padding?: number
}

const MapBoundaryLayer: React.FC<Props> = ({
  map,
  maskColor = 'rgba(255,255,255,1)',
  fitToView = false,
  padding = 0
}) => {
  useEffect(() => {
    if (!map) return

    // 1) Read GeoJSON features in map projection (EPSG:3857)
    const format = new OLGeoJSON()
    const features = format.readFeatures(uzmap, { featureProjection: 'EPSG:3857' })

    // 2) Extract rings to use as holes (each ring is an array of coords in EPSG:3857)
    const holeRings: number[][][] = [] // array of linear rings
    features.forEach((f) => {
      const g = f.getGeometry()
      if (!g) return

      if (g instanceof Polygon) {
        // Polygon.getCoordinates() => [outerRing, hole1, hole2, ...]
        const coords = g.getCoordinates()
        // take outer ring (coords[0]) as the *area to keep* (we'll put it as a hole),
        // note: OL polygon coordinates are in EPSG:3857 already because of readFeatures option.
        if (coords[0]) holeRings.push(coords[0])
      } else if (g instanceof MultiPolygon) {
        const mpCoords = g.getCoordinates() // [[[poly1outer],[poly1hole...]], [[poly2outer],...], ...]
        mpCoords.forEach((polyCoords) => {
          if (polyCoords[0]) holeRings.push(polyCoords[0])
        })
      } else {
        // for other geometry types (Point/Line) we can skip or buffer — keep simple: ignore
      }
    })

    if (holeRings.length === 0) {
      // nothing to show — avoid blocking whole map; do nothing
      return
    }

    // 3) Build a world rectangle ring in EPSG:3857 using projection extent
    const projExtent = map.getView().getProjection().getExtent() // [minX, minY, maxX, maxY]
    const minX = projExtent[0]
    const minY = projExtent[1]
    const maxX = projExtent[2]
    const maxY = projExtent[3]
    const outerRing = [
      [minX, minY],
      [maxX, minY],
      [maxX, maxY],
      [minX, maxY],
      [minX, minY]
    ]

    // 4) Combine into a single Polygon where outerRing is first, then holes
    // OL Polygon constructor expects an array of linear rings: [outerRing, hole1, hole2, ...]
    const maskPolygon = new Polygon([outerRing, ...holeRings])

    const maskFeature = new Feature(maskPolygon)

    const vectorSource = new VectorSource({
      features: [maskFeature]
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: maskColor
        }),
        stroke: new Stroke({
          color: 'rgba(0,0,0,0.0)',
          width: 0
        })
      })
    })

    // ensure mask sits above base layers
    vectorLayer.setZIndex(9999)
    map.addLayer(vectorLayer)

    // Optional: fit view to GeoJSON area so it is centered and visible
    if (fitToView) {
      // compute combined extent of features (holes)
      const combinedExtent = vectorSource.getExtent()
      // fit to combined extent but with padding
      if (combinedExtent && !isNaN(combinedExtent[0])) {
        map.getView().fit(combinedExtent, { padding: [padding, padding, padding, padding], duration: 400 })
      }
    }

    // cleanup on unmount / data change
    return () => {
      map.removeLayer(vectorLayer)
      vectorSource.clear(true)
    }
  }, [map, maskColor, fitToView, padding])

  return null
}

export default MapBoundaryLayer
