import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import './CustomMap.css'
import { DisplayMapProps } from '../../Type/ComponentBasedType'

const DisplayMap: React.FC<DisplayMapProps> = ({ center }) => {
  const zoom = 13

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} />
    </MapContainer>
  )
}

export default DisplayMap
