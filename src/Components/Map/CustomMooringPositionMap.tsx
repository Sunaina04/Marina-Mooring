import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './CustomMap.css'
import { CustomMooringPositionMapProps } from '../../Type/Components/MapTypes'
import { useRef } from 'react'

const CustomMooringPositionMap: React.FC<CustomMooringPositionMapProps> = ({
  position,
  zoomLevel,
  popUpMessage,
  style,
  icon,
}) => {
  const markerRef = useRef(null)

  return (
    <MapContainer
      style={style}
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} ref={markerRef} icon={icon || DefaultIcon}>
        <Popup>{popUpMessage}</Popup>
      </Marker>
    </MapContainer>
  )
}

const DefaultIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [40, 50],
})

export default CustomMooringPositionMap
