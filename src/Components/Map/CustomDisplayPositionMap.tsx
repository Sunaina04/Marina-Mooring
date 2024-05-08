import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import { CustomMapProps } from '../../Type/ComponentBasedType'

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

let DefaultIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [100, 100],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
})
L.Marker.prototype.options.icon = DefaultIcon

export default CustomDisplayPositionMap
