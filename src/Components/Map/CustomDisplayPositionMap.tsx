import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import { CustomMapProps } from '../../Type/ComponentBasedType'
import DefaultIcon from './DefaultIcon'

const CustomDisplayPositionMap: React.FC<CustomMapProps> = ({
  position = [31.63398, 74.872261],
  zoomLevel = 9,
  popUpMessage,
}) => {
  return (
    <MapContainer center={position} zoom={zoomLevel}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{popUpMessage}</Popup>
      </Marker>
    </MapContainer>
  )
}

L.Marker.prototype.options.icon = DefaultIcon

export default CustomDisplayPositionMap
