import { ControlPosition } from 'leaflet'
import { TileLayer, LayersControl } from 'react-leaflet'

export const mayLayers = [
  {
    name: 'Ochiq xarita',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: undefined
  },
  {
    name: "Sun'iy yo'ldosh",
    url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }
  // {
  //   name: 'Ochiq havo',
  //   url: 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=M8EHbCEHObQwHV5UD3Vy'
  // }
]

type LayersControlsProps = {
  position?: ControlPosition
}

function LayersControls({ position }: LayersControlsProps) {
  return (
    <LayersControl position={position}>
      {mayLayers.map((data: { name: string; url: string; subdomains?: string[] }, index: number) => (
        <LayersControl.BaseLayer key={index} checked={index === 1} name={data.name}>
          <TileLayer
            url={data.url}
            maxZoom={data.name === 'Ochiq xarita' ? 20 : 21}
            {...(data.subdomains ? { subdomains: data.subdomains } : null)}
          />
        </LayersControl.BaseLayer>
      ))}
    </LayersControl>
  )
}

export default LayersControls
